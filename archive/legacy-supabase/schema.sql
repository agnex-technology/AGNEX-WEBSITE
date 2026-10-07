-- Supabase Database Schema for AGNEX Technology

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Contacts Table
create table if not exists public.contacts (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text not null,
    message text not null,
    status text not null default 'new', -- 'new', 'read', 'archived'
    created_at timestamptz default now()
);

-- Enable RLS for contacts
alter table public.contacts enable row level security;

-- Policies for contacts
create policy "Allow public inserts to contacts"
on public.contacts for insert
with check (true);

create policy "Allow authenticated admins select on contacts"
on public.contacts for select
using (auth.role() = 'authenticated');

create policy "Allow authenticated admins update on contacts"
on public.contacts for update
using (auth.role() = 'authenticated');

create policy "Allow authenticated admins delete on contacts"
on public.contacts for delete
using (auth.role() = 'authenticated');


-- 2. Careers Table
create table if not exists public.careers (
    id uuid primary key default gen_random_uuid(),
    candidate_name text not null,
    candidate_email text not null,
    portfolio_link text not null,
    status text not null default 'pending', -- 'pending', 'reviewed', 'rejected'
    created_at timestamptz default now()
);

-- Enable RLS for careers
alter table public.careers enable row level security;

-- Policies for careers
create policy "Allow public inserts to careers"
on public.careers for insert
with check (true);

create policy "Allow authenticated admins select on careers"
on public.careers for select
using (auth.role() = 'authenticated');

create policy "Allow authenticated admins update on careers"
on public.careers for update
using (auth.role() = 'authenticated');

create policy "Allow authenticated admins delete on careers"
on public.careers for delete
using (auth.role() = 'authenticated');


-- 3. Newsletter Subscribers Table
create table if not exists public.newsletter_subscribers (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    created_at timestamptz default now()
);

-- Enable RLS for newsletter subscribers
alter table public.newsletter_subscribers enable row level security;

-- Policies for newsletter subscribers
create policy "Allow public inserts to newsletter_subscribers"
on public.newsletter_subscribers for insert
with check (true);

create policy "Allow authenticated admins select on newsletter_subscribers"
on public.newsletter_subscribers for select
using (auth.role() = 'authenticated');

create policy "Allow authenticated admins delete on newsletter_subscribers"
on public.newsletter_subscribers for delete
using (auth.role() = 'authenticated');


-- 4. Services Catalog Table
create table if not exists public.services (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    icon_class text not null default 'fas fa-cogs',
    description text not null,
    benefit text,
    created_at timestamptz default now()
);

-- Enable RLS for services
alter table public.services enable row level security;

-- Policies for services
create policy "Allow public select on services"
on public.services for select
using (true);

create policy "Allow authenticated admins all on services"
on public.services for all
using (auth.role() = 'authenticated');


-- 5. Blogs Table
create table if not exists public.blogs (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    summary text not null,
    content text not null,
    author_email text not null default 'admin@agnex.tech',
    published_at timestamptz default now(),
    is_published boolean not null default true,
    created_at timestamptz default now()
);

-- Enable RLS for blogs
alter table public.blogs enable row level security;

-- Policies for blogs
create policy "Allow public select on published blogs"
on public.blogs for select
using (is_published = true);

create policy "Allow authenticated admins all on blogs"
on public.blogs for all
using (auth.role() = 'authenticated');

-- Create Indexes for performance
create index if not exists idx_contacts_created_at on public.contacts(created_at desc);
create index if not exists idx_careers_created_at on public.careers(created_at desc);
create index if not exists idx_blogs_published_at on public.blogs(published_at desc) where is_published = true;
