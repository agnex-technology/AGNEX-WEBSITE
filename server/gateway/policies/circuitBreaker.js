/**
 * Phase 113 — API Gateway: Circuit Breaker
 * Prevents cascading failures by tracking failure rates per upstream service.
 * States: CLOSED (normal) → OPEN (failing, reject fast) → HALF-OPEN (testing recovery)
 */

const STATES = { CLOSED: 'CLOSED', OPEN: 'OPEN', HALF_OPEN: 'HALF_OPEN' };

class CircuitBreaker {
  constructor(name, options = {}) {
    this.name = name;
    this.failureThreshold = options.failureThreshold || 5;
    this.successThreshold = options.successThreshold || 2;
    this.timeout = options.timeout || 30000; // 30 seconds in OPEN state
    this.state = STATES.CLOSED;
    this.failures = 0;
    this.successes = 0;
    this.lastFailureTime = null;
  }

  async execute(fn) {
    if (this.state === STATES.OPEN) {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = STATES.HALF_OPEN;
        console.log(JSON.stringify({ level: 'warn', message: `Circuit Breaker [${this.name}] → HALF_OPEN` }));
      } else {
        throw new Error(`Circuit Breaker OPEN: ${this.name} is unavailable`);
      }
    }

    try {
      const result = await fn();
      this._onSuccess();
      return result;
    } catch (err) {
      this._onFailure();
      throw err;
    }
  }

  _onSuccess() {
    this.failures = 0;
    if (this.state === STATES.HALF_OPEN) {
      this.successes++;
      if (this.successes >= this.successThreshold) {
        this.state = STATES.CLOSED;
        this.successes = 0;
        console.log(JSON.stringify({ level: 'info', message: `Circuit Breaker [${this.name}] → CLOSED (recovered)` }));
      }
    }
  }

  _onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.failureThreshold || this.state === STATES.HALF_OPEN) {
      this.state = STATES.OPEN;
      console.log(JSON.stringify({ level: 'error', message: `Circuit Breaker [${this.name}] → OPEN (failures: ${this.failures})` }));
    }
  }

  getStatus() {
    return { name: this.name, state: this.state, failures: this.failures };
  }
}

// Registry of all circuit breakers (exposed at /health/status for monitoring)
const registry = new Map();

const getBreaker = (name, options) => {
  if (!registry.has(name)) registry.set(name, new CircuitBreaker(name, options));
  return registry.get(name);
};

const getAllStatus = () => Array.from(registry.values()).map(b => b.getStatus());

module.exports = { CircuitBreaker, getBreaker, getAllStatus };
