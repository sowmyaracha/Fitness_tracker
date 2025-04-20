# Insights Tracker Fitness Application

A comprehensive fitness tracking platform that helps users monitor workouts, track diet plans, and shop for fitness products.

## Overview

This application provides a complete fitness management solution with role-based access for users, vendors, and administrators. It features workout tracking, diet planning, e-commerce integration, and personalized fitness statistics.

## Features

### Authentication

- **Login** - Secure authentication for existing users
- **Signup** - New user registration with profile details
- **Verification** - Email verification for new accounts
- **Password Recovery** - Forgot password functionality

### Landing Pages

- **Home** - Introduction to the platform with key features
- **About** - Information about the platform, programs, and core values
- **Contact** - Get in touch with the team

### Dashboard Features

#### User Dashboard

- **Workout Plan** - Personalized workout routines
- **Diet Plan** - Customized nutrition plans
- **Shop** - Browse and purchase fitness products
- **Cart** - Manage selected products
- **Wishlist** - Save products for later
- **Checkout** - Complete purchase process
- **Orders** - Track order history
- **Personal Record** - Monitor fitness achievements
- **Chat** - Communicate with trainers and support
- **Settings** - Manage account preferences

#### Admin Dashboard

- **Workout Management**
  - Manage workout plans
  - Track workout logs
  - Manage activities
- **Diet Management**
  - Manage diet plans
  - Food catalog management
  - Food log tracking
- **E-commerce Management**
  - Product management
  - Order management
  - User management
- **Analytics**
  - Workout statistics
  - User engagement metrics
- **System Integration** - Third-party service connections

#### Vendor Dashboard

- **Product Management** - Add and update products
- **Order Management** - Process customer orders
- **Shop Management** - Manage store settings
- **Communication** - Chat with customers

## Routes Structure

### Public Routes

- `/` - Landing page
- `/about` - About page
- `/contact` - Contact page

### Authentication Routes

- `/auth/login` - Login page
- `/auth/signup` - Registration page
- `/auth/verify` - Email verification
- `/auth/forgot` - Password recovery

### User Routes

- `/dashboard/user` - User dashboard
- `/dashboard/user/workoutplan` - Workout planning
- `/dashboard/user/dietplan` - Diet planning
- `/dashboard/user/shop` - Product browsing
- `/dashboard/user/cart` - Shopping cart
- `/dashboard/user/wishlist` - Saved products
- `/dashboard/user/checkout` - Purchase completion
- `/dashboard/user/orders` - Order history
- `/dashboard/user/personalrecord` - Fitness achievements
- `/dashboard/user/settings` - Account settings
- `/dashboard/user/chat` - Support communication

### Admin Routes

- `/dashboard/admin` - Admin dashboard
- `/dashboard/admin/manageworkoutplan` - Workout plan management
- `/dashboard/admin/manageworkoutlog` - Workout log management
- `/dashboard/admin/manageactivity` - Activity management
- `/dashboard/admin/managedietplan` - Diet plan management
- `/dashboard/admin/managefoodcatalogue` - Food catalog management
- `/dashboard/admin/managefoodlog` - Food log management
- `/dashboard/admin/manageproducts` - Product management
- `/dashboard/admin/manageusers` - User management
- `/dashboard/admin/integration` - Third-party integrations
- `/dashboard/admin/workoutstat` - Workout statistics

### Vendor Routes

- `/dashboard/vendor` - Vendor dashboard
- `/dashboard/vendor/shop` - Vendor shop management
- `/dashboard/vendor/orders` - Order management
- `/dashboard/vendor/manageproducts` - Product management

## Technology Stack

- **Frontend**: React 19
- **Routing**: React Router v7
- **Charts**: Recharts, Chartist
- **UI Components**: RSuite
- **Form Components**: React Select, React DatePicker
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```
