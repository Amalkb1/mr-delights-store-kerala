# MR Delights Luxury

Build a premium, modern, mobile-first e-commerce website for a Kerala-based luxury dates and nuts brand called "MR Delights".

Brand Identity

MR Delights sells premium imported dates, nuts, figs, and seeds. The website should feel luxurious, trustworthy, clean, and premium, similar to high-end food brands.

Brand Colors

Primary Gold: #D4AF37

Deep Green: #0B3D2E

White: #FFFFFF

Light Beige: #F8F5F0

Fonts

Playfair Display for headings

Outfit for body text

Website Requirements

Pages

Home

Shop

Product Details

About Us

Contact Us

Login

Register

User Profile

Cart

Home Page Sections

Hero Section

Premium luxury banner

High-quality dates and nuts imagery

Heading:
"Premium Dates & Nuts Delivered Across Kerala"

Subheading:
"Experience purity, freshness, and luxury in every bite."

Shop Now button

Trust Badges

100% Natural

Premium Quality

No Preservatives

Fast Delivery

Featured Products

Display premium product cards with:

Product image

Product name

Price

Discount badge (if applicable)

Add to Cart button

Quick View button

Categories

Dates

Nuts

Figs

Seeds

About Section

Brief story about MR Delights and commitment to quality.

Customer Reviews Section

Premium testimonials carousel.

Contact Section

WhatsApp button
Phone number
Email
Location

Shop Page

Product Grid

Each product should contain:

Multiple product images

Product title

Description

Weight options

Price

Stock status

Quantity selector

Add to Cart button

Filters

Category filter

Price filter

Search bar

Sort by newest

Sort by price

Sort by popularity

Product Management System (Frontend Only)

Create a hidden Admin Dashboard accessible through:

/admin

Admin login should use a simple frontend demo authentication.

Admin should be able to:

Product Management

Add new products

Edit products

Delete products

Change prices

Change descriptions

Upload product images

Change stock status

Create categories

Store all product information using browser localStorage so changes remain after refresh.

User Features

Authentication

Frontend-only Login and Registration pages.

Store user information in localStorage.

Fields:

Name

Phone Number

Email

Password

Address

User Profile

Users can:

Edit profile

View saved information

View previous orders stored locally

Shopping Cart

Features:

Add products

Remove products

Increase quantity

Decrease quantity

Cart badge counter

Cart sidebar

Order summary

Delivery charge calculation

Free delivery above ₹999

Checkout Process

Customer enters:

Name

Phone

Address

Order Notes

When user clicks "Place Order":

Generate a professional WhatsApp order message containing:

Customer details

Ordered products

Quantities

Total amount

Delivery address

Automatically open WhatsApp chat with the owner's number:

+918289842739

using:
https://wa.me/8289842739

Do NOT implement online payment gateways.

Orders should be saved in localStorage for demonstration purposes.

UI & UX Requirements

Premium luxury appearance

Glassmorphism cards

Smooth animations

Scroll animations

Modern hover effects

Sticky navbar

Mobile-first responsive design

Fast loading

SEO-friendly structure

Elegant product cards

Beautiful cart experience

Luxury premium food-brand aesthetic

Generate all HTML, CSS, and JavaScript required for a complete frontend-only e-commerce website.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mr-delights-store-kerala.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ad0616b4-fcc8-4023-a67b-974c19a39973).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
