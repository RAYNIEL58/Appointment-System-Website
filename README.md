# Appointment System – Website

Booking website for Cudiamat Medical Corp. Patients book appointments here. The employee desktop app (separate) is used to approve them.

---

## What You Need to Download

| Software | Purpose | Download |
|----------|---------|----------|
| **Node.js** (LTS) | Run this website | https://nodejs.org |

---

## How to Run

1. Open a terminal in **this folder** (where `package.json` is).
2. Install dependencies:

```bash
npm install
```

3. Start the website:

```bash
npm run dev
```

4. Open a browser and go to: **http://localhost:3000**

---

## Notes

- Appointments are saved in **`data/appointments.json`**.
- The employee app (C#) connects to **http://localhost:3000/api/appointments** to load and approve bookings. Run the website first if you use the employee app.
