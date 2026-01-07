# Uzera Tracking Test Website

This is a temporary website created to test Uzera tracking functionality. The website includes comprehensive tracking implementation for user interactions, events, and analytics.

## Features

### 🎯 **Uzera Integration**
- Complete Uzera SDK integration in the `<head>` section
- User identification with detailed user data
- Event tracking for all user interactions
- Product view and purchase tracking

### 🏠 **Website Sections**
- **Home**: Hero section with login/signup buttons
- **Products**: Product showcase with tracking on hover and purchase
- **About**: Information about the test site
- **Contact**: Contact form with submission tracking

### 📊 **Tracking Events Implemented**

#### User Identification
- `uzera("identify")` - Tracks user details including:
  - User ID, name, email
  - Join date, plan, role
  - Company name, account ID
  - Purchase and renewal dates

#### Page Interactions
- **Page View** - Tracks when page loads
- **Navigation Click** - Tracks menu navigation
- **Scroll Depth** - Tracks scroll progress (every 25%)
- **Page Exit** - Tracks time spent and max scroll depth

#### User Authentication
- **Login Modal Opened** - When login button is clicked
- **Signup Modal Opened** - When signup button is clicked
- **User Login** - When user successfully logs in
- **User Signup** - When user creates new account
- **User Session Started** - When user is identified
- **User Logout** - When user logs out

#### Product Interactions
- **Product View** - When hovering over product cards
- **Purchase** - When clicking "Buy Now" buttons
  - Includes product ID, name, price, category

#### Form Interactions
- **Form Field Focus** - When clicking on form fields
- **Form Field Blur** - When leaving form fields
- **Contact Form Submitted** - When contact form is submitted

## How to Use

### 1. **Open the Website**
Simply open `index.html` in your web browser. The Uzera tracking script is already integrated.

### 2. **Test User Authentication**
- Click "Login" or "Sign Up" buttons
- Fill out the forms with test data
- Watch the console for tracking events

### 3. **Test Product Tracking**
- Hover over product cards to trigger "Product View" events
- Click "Buy Now" buttons to trigger "Purchase" events
- Products will highlight briefly when tracked

### 4. **Test Form Interactions**
- Fill out the contact form
- Interact with login/signup forms
- Watch for form field focus/blur events

### 5. **Test Navigation**
- Click on navigation menu items
- Scroll through the page to trigger scroll depth tracking

## Console Logging

All tracking events are logged to the browser console for debugging:
- Page views and navigation
- User identification
- Product interactions
- Form submissions
- Scroll depth and time tracking

## Uzera Configuration

The website uses the following Uzera configuration:
- **Account ID**: `4UUNPCIWVY`
- **Script URL**: `https://assets.gainserv.in/wrapper.dev.js`
- **Tracking Domain**: Automatically detected from hostname

## File Structure

```
├── index.html          # Main HTML file with Uzera script
├── styles.css          # Modern, responsive CSS styling
├── script.js           # JavaScript with all tracking logic
└── README.md           # This documentation file
```

## Testing Checklist

- [ ] Page loads and Uzera script initializes
- [ ] User can sign up with full details
- [ ] User can log in and is identified
- [ ] Product views are tracked on hover
- [ ] Purchases are tracked on button click
- [ ] Contact form submission is tracked
- [ ] Navigation clicks are tracked
- [ ] Scroll depth is tracked
- [ ] Form field interactions are tracked
- [ ] User logout is tracked

## Notes

- This is a demo website for testing purposes
- All data is simulated (no real authentication)
- User sessions persist in localStorage for demo purposes
- Visual feedback (highlighting) shows when tracking events fire
- Console logs provide detailed tracking information

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Responsive design works on mobile devices 