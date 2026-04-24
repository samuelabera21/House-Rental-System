# 📄 UI STRUCTURE & FUNCTIONAL DESIGN DOCUMENT

House Rental Management System

## 1. Introduction

This document describes the User Interface (UI) structure, navigation flow, and functionality of the House Rental Management System. It is intended to guide the development team in building a consistent, user-friendly, and scalable web application.

The system supports three types of users:

• Renter
• House Owner
• Administrator

## 2. System Entry & Navigation

### 2.1 Landing Page (Home Page)

This is the first page users see when they access the system.

Key Components:

• Navigation Bar:
  o Home
  o Login
  o Register
• Search Bar (Quick Search)
• Featured House Listings
• About Section (system purpose)

Purpose:

• Provide overview of the system
• Allow quick house search
• Guide users to authentication

## 3. Authentication Module

### 3.1 Registration Page

Fields:

• Full Name
• Email Address
• Password
• Role Selection:
  o Renter
  o House Owner

Functionality:

• Create new user account
• Store user data securely
• Redirect to login after success

### 3.2 Login Page

Fields:

• Email
• Password

Functionality:

• Authenticate users
• Redirect users to their respective dashboard based on role

## 4. Role-Based Dashboard System

After login, users are redirected to dashboards based on their roles.

## 🟢 5. Renter Interface

### 5.1 Renter Dashboard

Features:

• Quick house search
• Recommended listings
• Notifications

### 5.2 Search Page

Features:

• Search input field
• Filters:
  o Location
  o Price
  o Number of rooms

### 5.3 House Listing Page

Features:

• Display houses in card format
• Each card includes:
  o Image
  o Price
  o Location
  o Short description

### 5.4 House Details Page

Features:

• Full house description
• Image gallery
• Owner contact information
• Action Button: Send Rental Request

### 5.5 My Requests Page

Features:

• View all requests
• Status:
  o Pending
  o Accepted
  o Rejected

## 🟡 6. House Owner Interface

### 6.1 Owner Dashboard

Features:

• Overview of listings
• Incoming rental requests

### 6.2 Add Listing Page

Features:

• Enter house details:
  o Price
  o Location
  o Number of rooms
• Upload house images

### 6.3 Manage Listings Page

Features:

• Edit listing
• Delete listing
• Update availability

### 6.4 View Requests Page

Features:

• View renter requests
• Actions:
  o Accept
  o Reject

## 🔴 7. Admin Interface

### 7.1 Admin Dashboard

Features:

• System overview (users, listings)

### 7.2 Manage Users

Features:

• View all users
• Remove or block users

### 7.3 Manage Listings

Features:

• Approve house listings
• Remove inappropriate content

## 🔔 8. Shared System Features

### 8.1 Notifications

• Notify owners when request is sent
• Notify renters when request is accepted/rejected

### 8.2 Profile Management

Features:

• Update personal information
• Change password
• Upload profile image

## 9. Navigation Structure

Home
├── Login
├── Register
├── Dashboard
     ├── Renter Module
     ├── Owner Module
     ├── Admin Module

## 10. UI Design Guidelines

### Color Scheme

• Primary Color: Blue (#2563eb)
• Secondary Color: Light Gray
• Success: Green
• Error: Red

### Design Principles

• Clean and minimal interface
• Responsive (mobile-friendly)
• Easy navigation
• Card-based layout for listings

## 11. System Behavior Summary

• Users must register and login
• Role determines accessible features
• Renters search and request houses
• Owners manage listings and requests
• Admin controls system integrity

## Conclusion

This UI structure ensures:

• Clear separation of user roles
• Efficient navigation
• Scalable system design
• Easy collaboration for development team
