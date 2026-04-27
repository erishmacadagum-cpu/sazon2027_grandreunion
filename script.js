{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Loading Screen\
window.addEventListener('load', () => \{\
    setTimeout(() => \{\
        const loadingScreen = document.querySelector('.loading-screen');\
        if (loadingScreen) \{\
            loadingScreen.style.display = 'none';\
        \}\
    \}, 2000);\
\});\
\
// Admin Password - CHANGE THIS!\
const ADMIN_PASSWORD = 'SAZON2027';\
\
// Generate QR Code\
function generateQRCode() \{\
    const siteUrl = window.location.href;\
    const qrcodeContainer = document.getElementById('qrcodeContainer');\
    \
    if (qrcodeContainer) \{\
        qrcodeContainer.innerHTML = '';\
        new QRCode(qrcodeContainer, \{\
            text: siteUrl,\
            width: 300,\
            height: 300,\
            colorDark: '#0066cc',\
            colorLight: '#ffffff',\
        \});\
    \}\
\}\
\
// Download QR Code\
function downloadQRCode() \{\
    const canvas = document.querySelector('#qrcodeContainer canvas');\
    if (canvas) \{\
        const link = document.createElement('a');\
        link.href = canvas.toDataURL();\
        link.download = 'Sazon2027_QRCode.png';\
        link.click();\
    \}\
\}\
\
// Share Website\
function shareWebsite() \{\
    const siteUrl = window.location.href;\
    const text = 'Join us for Sazon 2027 - Grand Family Reunion!';\
    \
    if (navigator.share) \{\
        navigator.share(\{\
            title: 'Sazon 2027',\
            text: text,\
            url: siteUrl\
        \});\
    \} else \{\
        navigator.clipboard.writeText(`$\{text\}\\n\\n$\{siteUrl\}`);\
        alert('Link copied to clipboard!');\
    \}\
\}\
\
// Play Jingle\
function playJingle() \{\
    const audio = new Audio('audio/jingle.mp3');\
    audio.play().catch(err => \{\
        alert('Audio not uploaded yet. Upload jingle.mp3 to audio/ folder');\
    \});\
\}\
\
// Submit Attendance Request\
function submitAttendanceRequest(event) \{\
    event.preventDefault();\
    \
    const name = document.getElementById('attendeeName').value;\
    const email = document.getElementById('attendeeEmail').value;\
    const contact = document.getElementById('attendeeContact').value;\
    const familyBranch = document.getElementById('familyBranch').value;\
    const guests = document.getElementById('numGuests').value;\
    \
    if (!name || !email || !contact || !familyBranch) \{\
        alert('Please fill all required fields!');\
        return;\
    \}\
    \
    let requests = JSON.parse(localStorage.getItem('attendanceRequests')) || [];\
    \
    requests.push(\{\
        id: Date.now(),\
        name, email, contact, familyBranch, guests,\
        status: 'pending',\
        date: new Date().toLocaleDateString()\
    \});\
    \
    localStorage.setItem('attendanceRequests', JSON.stringify(requests));\
    document.getElementById('attendanceForm').reset();\
    \
    const notice = document.getElementById('pendingNotice');\
    if (notice) notice.style.display = 'block';\
\}\
\
// Toggle Admin Panel\
function toggleAdminPanel() \{\
    const panel = document.getElementById('adminPanel');\
    if (panel.style.display === 'none') \{\
        panel.style.display = 'block';\
    \} else \{\
        panel.style.display = 'none';\
    \}\
\}\
\
// Admin Login\
function adminLogin(event) \{\
    event.preventDefault();\
    const password = document.getElementById('adminPassword').value;\
    \
    if (password === ADMIN_PASSWORD) \{\
        document.getElementById('adminLoginForm').style.display = 'none';\
        document.getElementById('adminDashboard').style.display = 'block';\
        loadPendingRequests();\
        loadApprovedAttendees();\
    \} else \{\
        alert('Wrong password!');\
    \}\
\}\
\
// Load Pending Requests\
function loadPendingRequests() \{\
    let requests = JSON.parse(localStorage.getItem('attendanceRequests')) || [];\
    let pending = requests.filter(r => r.status === 'pending');\
    \
    let html = '<p>No pending requests</p>';\
    if (pending.length > 0) \{\
        html = '';\
        pending.forEach(req => \{\
            html += `\
                <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px;">\
                    <strong>$\{req.name\}</strong> - $\{req.familyBranch\}<br>\
                    \uc0\u55357 \u56551  $\{req.email\} | \u55357 \u56561  $\{req.contact\}<br>\
                    <button class="btn btn-success" onclick="approveRequest($\{req.id\})">Approve</button>\
                    <button class="btn btn-danger" onclick="rejectRequest($\{req.id\})">Reject</button>\
                </div>\
            `;\
        \});\
    \}\
    document.getElementById('pendingRequestsList').innerHTML = html;\
\}\
\
// Load Approved Attendees\
function loadApprovedAttendees() \{\
    let requests = JSON.parse(localStorage.getItem('attendanceRequests')) || [];\
    let approved = requests.filter(r => r.status === 'approved');\
    \
    let html = '<p>No approved attendees</p>';\
    if (approved.length > 0) \{\
        html = '<table style="width:100%; border-collapse: collapse;">';\
        html += '<tr style="background: #0066cc; color: white;"><th style="padding:10px;">Name</th><th>Branch</th><th>Guests</th></tr>';\
        approved.forEach(req => \{\
            html += `<tr style="border-bottom: 1px solid #ddd;"><td style="padding:10px;">$\{req.name\}</td><td>$\{req.familyBranch\}</td><td>$\{req.guests\}</td></tr>`;\
        \});\
        html += '</table>';\
    \}\
    document.getElementById('approvedAttendeesList').innerHTML = html;\
\}\
\
// Approve Request\
function approveRequest(id) \{\
    let requests = JSON.parse(localStorage.getItem('attendanceRequests')) || [];\
    let req = requests.find(r => r.id === id);\
    if (req) \{\
        req.status = 'approved';\
        localStorage.setItem('attendanceRequests', JSON.stringify(requests));\
        alert(req.name + ' approved!');\
        loadPendingRequests();\
        loadApprovedAttendees();\
    \}\
\}\
\
// Reject Request\
function rejectRequest(id) \{\
    let requests = JSON.parse(localStorage.getItem('attendanceRequests')) || [];\
    requests = requests.filter(r => r.id !== id);\
    localStorage.setItem('attendanceRequests', JSON.stringify(requests));\
    alert('Request rejected');\
    loadPendingRequests();\
\}\
\
// Admin Logout\
function adminLogout() \{\
    document.getElementById('adminLoginForm').style.display = 'block';\
    document.getElementById('adminDashboard').style.display = 'none';\
    document.getElementById('adminPassword').value = '';\
\}\
\
// Initialize on page load\
window.addEventListener('DOMContentLoaded', () => \{\
    generateQRCode();\
\});}