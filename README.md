<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sazon 2027 - Grand Family Reunion</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
</head>
<body>
    <div class="loading-screen">
        <div class="loader"></div>
        <p>Welcome to Sazon 2027...</p>
    </div>

    <div class="container">
        <div class="header">
            <img src="images/banner.jpg" alt="Sazon 2027" class="banner" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221200%22 height=%22300%22%3E%3Crect fill=%22%230066cc%22 width=%221200%22 height=%22300%22/%3E%3C/svg%3E'">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center; width: 100%;">
                <h1>🏝️ SAZON 2027 🏝️</h1>
                <p style="font-size: 24px;">1st Edition Grand Family Reunion</p>
                <p style="font-size: 18px;">Gikan sa Gamut, Tubtob sa Langit</p>
            </div>
        </div>

        <nav class="navbar">
            <ul>
                <li><a href="#home">🏠 Home</a></li>
                <li><a href="#details">📅 Details</a></li>
                <li><a href="#attend">✍️ Register</a></li>
                <li><a href="#share">📤 Share</a></li>
            </ul>
        </nav>

        <section id="home" class="section">
            <img src="images/logo.png" alt="Logo" class="logo" onerror="this.style.display='none'">
            <h2>Welcome to Sazon 2027</h2>
            <p style="text-align: center; font-size: 18px;">🎉 Join us for the most awaited Ilonggo family gathering!</p>
            <p>We are excited to welcome you to the 1st Edition of the Grand Family Reunion. This event celebrates our heritage, strengthens family bonds, and creates lasting memories.</p>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn btn-secondary" onclick="playJingle()">🎵 Play Jingle</button>
            </div>
        </section>

        <section id="details" class="section">
            <h2>📅 Event Details</h2>
            <div class="event-info">
                <div class="info-item">
                    <div>
                        <h3>📆 Dates</h3>
                        <p><strong>July 22-23, 2027</strong></p>
                    </div>
                </div>
                <div class="info-item">
                    <div>
                        <h3>📍 Venue</h3>
                        <p><strong>Marzon Resort, Kalibo, Aklan</strong></p>
                    </div>
                </div>
                <div class="info-item">
                    <div>
                        <h3>🌊 Location</h3>
                        <p>Near beautiful Boracay Island</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="attend" class="section">
            <h2>✍️ Register Your Attendance</h2>
            <form id="attendanceForm" class="form" onsubmit="submitAttendanceRequest(event)">
                <input type="text" id="attendeeName" placeholder="Full Name" required>
                <input type="email" id="attendeeEmail" placeholder="Email Address" required>
                <input type="tel" id="attendeeContact" placeholder="Contact Number" required>
                <select id="familyBranch" required>
                    <option value="">Select Family Branch</option>
                    <option value="Main Family">Main Family</option>
                    <option value="Northern Branch">Northern Branch</option>
                    <option value="Southern Branch">Southern Branch</option>
                    <option value="Eastern Branch">Eastern Branch</option>
                    <option value="Western Branch">Western Branch</option>
                </select>
                <input type="number" id="numGuests" placeholder="Additional Guests" min="0" value="0">
                <button type="submit" class="btn btn-primary">Submit Registration</button>
            </form>
            <div id="pendingNotice" class="pending-notice" style="display: none;">
                ✅ Thank you! Your registration is pending approval.
            </div>
        </section>

        <section id="share" class="section">
            <h2>📤 Share & Invite</h2>
            <div style="text-align: center;">
                <button class="btn btn-primary" onclick="shareWebsite()">📤 Share Website</button>
                <button class="btn btn-secondary" onclick="downloadQRCode()">⬇️ Download QR Code</button>
            </div>
            <h3 style="text-align: center; margin-top: 30px;">QR Code</h3>
            <div class="qrcode-container">
                <div id="qrcodeContainer"></div>
            </div>
        </section>

        <section class="section">
            <div style="text-align: center;">
                <button class="btn btn-secondary" onclick="toggleAdminPanel()">⚙️ Admin Access</button>
            </div>
            
            <div id="adminPanel" style="display: none; margin-top: 30px;">
                <div id="adminLoginForm" style="background: #fff3cd; padding: 20px; border-radius: 8px; text-align: center;">
                    <h3>🔐 Admin Login</h3>
                    <form onsubmit="adminLogin(event)" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <input type="password" id="adminPassword" placeholder="Password" required style="padding: 10px; border: 2px solid #0066cc; border-radius: 5px;">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
                
                <div id="adminDashboard" style="display: none; margin-top: 20px;">
                    <button class="btn btn-danger" onclick="adminLogout()" style="float: right;">Logout</button>
                    <h3>📋 Pending Requests</h3>
                    <div id="pendingRequestsList" style="background: #f8f9fa; padding: 15px; margin-bottom: 20px;"></div>
                    
                    <h3>✅ Approved Attendees</h3>
                    <div id="approvedAttendeesList" style="background: #f8f9fa; padding: 15px;"></div>
                </div>
            </div>
        </section>
    </div>

    <footer class="footer">
        <p><strong>Sazon 2027 - Grand Family Reunion</strong></p>
        <p>"Gikan sa Gamut, Tubtob sa Langit" - From the Roots, Towards the Sky</p>
        <p>July 22-23, 2027 • Marzon Resort, Kalibo, Aklan</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
