/**
 * Phase 124 — Enterprise AI Memory System
 * Memory Store — persistent multi-scope memory with TTL and compression
 * 
 * Scopes: conversation | user | workspace | organization | project
 * In production: backed by Redis (TTL-native) or PostgreSQL with JSONB.
 */

class MemoryStore {
  constructor() {
    // Structure: Map<scope:id, { entries: [], lastAccessed, compressedSummary }>
    this._store = new Map();

    // Default TTLs per scope (ms)
    this.ttl = {
      conversation:  4 * 60 * 60 * 1000,    // 4 hours
      user:          30 * 24 * 60 * 60 * 1000, // 30 days
      workspace:     90 * 24 * 60 * 60 * 1000, // 90 days
      organization:  365 * 24 * 60 * 60 * 1000, // 1 year
      project:       90 * 24 * 60 * 60 * 1000, // 90 days
    };

    this.maxEntriesPerScope = 100;

    // Periodic cleanup
    setInterval(() => this._evictExpired(), 15 * 60 * 1000).unref();
  }

  /**
   * Store a memory entry
   * @param {object} params
   * @param {string} params.scope - 'conversation'|'user'|'workspace'|'organization'|'project'
   * @param {string} params.id    - Scope identifier (userId, conversationId, etc.)
   * @param {object} params.entry - { role, content, timestamp, metadata }
   */
  set({ scope, id, entry }) {
    const key = `${scope}:${id}`;
    if (!this._store.has(key)) {
      this._store.set(key, { entries: [], lastAccessed: Date.now(), compressedSummary: null });
    }

    const mem = this._store.get(key);
    mem.lastAccessed = Date.now();
    mem.entries.push({ ...entry, timestamp: entry.timestamp || new Date().toISOString() });

    // Evict oldest if over limit (keeping compressed summary of evicted)
    if (mem.entries.length > this.maxEntriesPerScope) {
      const evicted = mem.entries.shift();
      // In production: call AI to compress evicted entries into summary
      mem.compressedSummary = `[Earlier context available — ${evicted.role}: ${String(evicted.content).slice(0, 100)}...]`;
    }
  }

  /**
   * Retrieve memory entries for a scope
   * @param {object} params
   * @param {string} params.scope
   * @param {string} params.id
   * @param {number} [params.limit] - Max entries to return
   * @returns {{ entries: Array, compressedSummary: string|null }}
   */
  get({ scope, id, limit = 20 }) {
    const key = `${scope}:${id}`;
    const mem = this._store.get(key);
    if (!mem) return { entries: [], compressedSummary: null };

    // Check TTL
    const maxAge = this.ttl[scope] || this.ttl.conversation;
    if (Date.now() - mem.lastAccessed > maxAge) {
      this._store.delete(key);
      return { entries: [], compressedSummary: null };
    }

    mem.lastAccessed = Date.now();
    const entries = mem.entries.slice(-limit);
    return { entries, compressedSummary: mem.compressedSummary };
  }

  /** Clear memory for a specific scope/id */
  clear({ scope, id }) {
    this._store.delete(`${scope}:${id}`);
  }

  /** Build a formatted context string from memory entries */
  formatAsContext({ scope, id, limit = 10 }) {
    const { entries, compressedSummary } = this.get({ scope, id, limit });
    const parts = [];
    if (compressedSummary) parts.push(`[Memory Summary]: ${compressedSummary}`);
    parts.push(...entries.map(e => `${e.role === 'user' ? 'User' : 'Assistant'}: ${e.content}`));
    return parts.join('\n');
  }

  _evictExpired() {
    const now = Date.now();
    for (const [key, mem] of this._store) {
      const scope = key.split(':')[0];
      const maxAge = this.ttl[scope] || this.ttl.conversation;
      if (now - mem.lastAccessed > maxAge) {
        this._store.delete(key);
      }
    }
  }

  getStats() {
    return {
      totalKeys: this._store.size,
      scopes: [...this._store.keys()].reduce((acc, key) => {
        const scope = key.split(':')[0];
        acc[scope] = (acc[scope] || 0) + 1;
        return acc;
      }, {}),
    };
  }
}

module.exports = new MemoryStore();
