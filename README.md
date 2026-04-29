# AI Sales Page Generator

An AI-powered web application that transforms raw product or service information into a fully structured, persuasive sales page using Google Gemini AI.

## Live Demo

Deployed on Vercel  
https://page-generator-ai.vercel.app/

## GitHub Repository

https://github.com/D4yezz/sales-page-generator

---

## Overview

This project was built to help users quickly generate high-converting sales pages without writing marketing copy manually.

Users simply input their product details, and the system uses AI to generate a professional landing page containing:

- Compelling headline
- Sub-headline
- Product description
- Benefits section
- Features breakdown
- Social proof placeholder
- Pricing section
- Call-to-action button

---

## Tech Stack

### Frontend
- Next.js (App Router)
- JavaScript
- Tailwind CSS
- shadCN UI

### Backend / Database
- Supabase
  - Authentication
  - PostgreSQL Database

### AI Integration
- Google Gemini 3 Flash API

### Deployment
- Vercel

---

## Features

### 1. User Authentication
Users can:

- Register account
- Login securely
- Logout session

Implemented using Supabase Auth.

---

### 2. Product Input Form

Users submit:

- Product / Service Name
- Description
- Key Features
- Target Audience
- Price
- Unique Selling Points

The form is designed for simplicity and fast input.

---

### 3. AI Sales Page Generation

Submitted data is sent to Gemini API with a structured prompt.

The AI returns persuasive sales copy formatted into sections:

- Hero Section
- Product Benefits
- Feature Breakdown
- Trust Section
- Pricing CTA

---

### 4. Saved Pages

Users can store generated pages into database and manage them later.

Available actions:

- View history
- Edit / Re-generate
- Delete page

---

### 5. Live Preview

Generated output is rendered instantly into a landing-page style preview so users can visualize the final result before saving.

---

## System Flow

1. User logs in
2. User fills product form
3. Frontend sends request to API route
4. API calls Gemini AI
5. Response parsed into structured JSON/content
6. Preview displayed
7. User saves page to Supabase

---

