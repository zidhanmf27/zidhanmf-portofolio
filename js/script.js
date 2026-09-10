// ============================================
// WEBSITE PORTOFOLIO - FILE JAVASCRIPT UTAMA
// ============================================

// ============================================
// 0. EFEK SPOTLIGHT (LAMPU MENYOROT)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    
    // Aktifkan spotlight setelah halaman dimuat
    setTimeout(() => {
        body.classList.add('spotlight-active');
    }, 100);
    
    // Track pergerakan mouse
    document.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        body.style.setProperty('--mouse-x', x + '%');
        body.style.setProperty('--mouse-y', y + '%');
    });
});

// ============================================
// 1. FUNGSIONALITAS MENU MOBILE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// ============================================
// 2. SAPAAN DINAMIS DENGAN NAMA (HALAMAN BERANDA)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const userNameElement = document.getElementById('user-name');
    
    if (userNameElement) {
        // Periksa jika nama tersimpan di localStorage
        let userName = localStorage.getItem('userName');
        
        if (!userName) {
            // Tampilkan modal kustom daripada prompt
            showNameModal();
        } else {
            // Tampilkan nama yang tersimpan
            displayUserName(userName);
        }
    }
});

/**
 * Tampilkan modal kustom untuk input nama
 */
function showNameModal() {
    // Buat HTML modal
    const modalHTML = `
        <div id="name-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in">
            <!-- Latar Belakang -->
            <div class="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>
            
            <!-- Konten Modal -->
            <div class="relative glass-effect rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-95 opacity-0" id="modal-content">
                <!-- Ikon -->
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                
                <!-- Judul -->
                <h2 class="text-3xl font-bold text-white text-center mb-2">Selamat Datang!</h2>
                <p class="text-white opacity-70 text-center mb-6">Silakan masukkan nama Anda untuk mempersonalisasi pengalaman Anda</p>
                
                <!-- Input -->
                <div class="mb-6">
                    <input 
                        type="text" 
                        id="modal-name-input" 
                        placeholder="Nama Anda..."
                        class="w-full px-4 py-3 bg-black border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-white placeholder-opacity-40 text-center text-lg"
                        autocomplete="off"
                    >
                    <p id="modal-error" class="text-white opacity-70 text-sm mt-2 text-center hidden"></p>
                </div>
                
                <!-- Tombol -->
                <button 
                    id="modal-submit-btn"
                    class="w-full px-6 py-3 bg-white text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                    Lanjutkan
                </button>
                
                <!-- Tautan Lewati -->
                <button 
                    id="modal-skip-btn"
                    class="w-full mt-3 text-white opacity-50 hover:opacity-100 transition-opacity text-sm"
                >
                    Lewati untuk sekarang
                </button>
            </div>
        </div>
    `;
    
    // Tambahkan modal ke body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Animasikan modal masuk
    setTimeout(() => {
        const modalContent = document.getElementById('modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }
    }, 50);
    
    // Dapatkan elemen
    const modal = document.getElementById('name-modal');
    const input = document.getElementById('modal-name-input');
    const submitBtn = document.getElementById('modal-submit-btn');
    const skipBtn = document.getElementById('modal-skip-btn');
    const errorMsg = document.getElementById('modal-error');
    
    // Fokus input
    setTimeout(() => input.focus(), 100);
    
    // Tangani submit
    submitBtn.addEventListener('click', function() {
        const name = input.value.trim();
        
        if (name === '') {
            errorMsg.textContent = 'Silakan masukkan nama Anda';
            errorMsg.classList.remove('hidden');
            input.classList.add('border-red-500');
            return;
        }
        
        if (name.length < 2) {
            errorMsg.textContent = 'Nama harus minimal 2 karakter';
            errorMsg.classList.remove('hidden');
            input.classList.add('border-red-500');
            return;
        }
        
        // Simpan dan tutup
        localStorage.setItem('userName', name);
        closeModal(modal, name);
    });
    
    // Tangani lewati
    skipBtn.addEventListener('click', function() {
        closeModal(modal, 'Pengunjung');
    });
    
    // Tangani tombol Enter
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
    
    // Hapus error pada input
    input.addEventListener('input', function() {
        errorMsg.classList.add('hidden');
        input.classList.remove('border-red-500');
    });
}

/**
 * Tutup modal dengan animasi
 */
function closeModal(modal, userName) {
    const modalContent = document.getElementById('modal-content');
    
    // Animasi keluar
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.remove();
        displayUserName(userName);
    }, 300);
}

/**
 * Tampilkan nama pengguna dengan animasi mengetik
 */
function displayUserName(userName) {
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = ''; // Kosongkan teks awal
        userNameElement.style.opacity = '1';
        userNameElement.classList.add('typing-cursor'); // Tambahkan kursor
        
        let i = 0;
        const speed = 150; // Kecepatan mengetik (ms)
        
        function typeWriter() {
            if (i < userName.length) {
                userNameElement.textContent += userName.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Opsional: Hilangkan kursor setelah selesai, atau biarkan berkedip
                // userNameElement.classList.remove('typing-cursor');
            }
        }
        
        // Mulai mengetik setelah jeda singkat
        setTimeout(typeWriter, 500);
    }
}

// ============================================
// 3. VALIDASI DAN PENGIRIMAN FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hapus pesan error sebelumnya
            clearErrors();
            
            // Dapatkan nilai form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Bendera validasi
            let isValid = true;
            
            // Validasi Nama
            if (name === '') {
                showError('name', 'Nama wajib diisi !');
                isValid = false;
            } else if (name.length < 3) {
                showError('name', 'Nama harus minimal 3 karakter !');
                isValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                showError('name', 'Nama hanya boleh berisi huruf dan spasi !');
                isValid = false;
            }
            
            // Validasi Email
            if (email === '') {
                showError('email', 'Email wajib diisi !');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Silakan masukkan alamat email yang valid !');
                isValid = false;
            }
            
            // Validasi Subjek
            if (!subject || subject === '') {
                showError('subject', 'Subjek pesan wajib dipilih !');
                isValid = false;
            }
            
            // Validasi Pesan
            if (message === '') {
                showError('message', 'Pesan wajib diisi !');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Pesan harus minimal 10 karakter !');
                isValid = false;
            }
            
            // Jika semua validasi lulus, tampilkan pengiriman
            if (isValid) {
                displaySubmission(name, email, subject, message);
            }
        });
    }
});

// ============================================
// 4. FUNGSI PEMBANTU VALIDASI
// ============================================

/**
 * Validasi format email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


/**
 * Tampilkan pesan error untuk sebuah field
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.nextElementSibling;
    
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        field.classList.add('border-red-500');
    }
}

/**
 * Hapus semua pesan error
 */
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.classList.add('hidden');
    });
    
    const fields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    fields.forEach(field => {
        field.classList.remove('border-red-500');
    });
}

// ============================================
// 5. TAMPILKAN HASIL PENGIRIMAN
// ============================================

/**
 * Tampilkan data form yang dikirim
 */
function displaySubmission(name, email, subject, message) {
    // Sanitasi input untuk mencegah XSS
    const sanitizedName = sanitizeHTML(name);
    const sanitizedEmail = sanitizeHTML(email);
    const sanitizedSubject = sanitizeHTML(subject);
    const sanitizedMessage = sanitizeHTML(message);
    
    // Dapatkan timestamp saat ini
    const timestamp = new Date().toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Perbarui tampilan hasil
    document.getElementById('result-name').textContent = sanitizedName;
    document.getElementById('result-subject').textContent = sanitizedSubject;
    document.getElementById('result-email').textContent = sanitizedEmail;
    document.getElementById('result-message').textContent = sanitizedMessage;
    document.getElementById('result-timestamp').textContent = timestamp;
    
    // Sembunyikan form dan tampilkan hasil
    document.getElementById('contact-form').classList.add('hidden');
    document.getElementById('submission-result').classList.remove('hidden');
    
    // Buka tautan Gmail secara otomatis dengan data yang terisi
    const emailSubjectLine = encodeURIComponent(`[Kontak Portofolio] ${sanitizedSubject} - dari ${sanitizedName}`);
    const emailBodyText = encodeURIComponent(
        `Halo Zidhan,\n\n` +
        `Anda menerima pesan baru melalui form kontak portofolio:\n\n` +
        `- Nama: ${sanitizedName}\n` +
        `- Email: ${sanitizedEmail}\n` +
        `- Subjek: ${sanitizedSubject}\n\n` +
        `Pesan:\n` +
        `${sanitizedMessage}\n\n` +
        `Salam,\n` +
        `${sanitizedName}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=zidhanmaulafatih@gmail.com&su=${emailSubjectLine}&body=${emailBodyText}`;
    
    // Set tombol redirect
    const gmailBtn = document.getElementById('gmail-redirect-btn');
    if (gmailBtn) {
        gmailBtn.href = gmailUrl;
    }
    
    // Gulir ke hasil
    document.getElementById('submission-result').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
    
    // Simpan pengiriman di localStorage (opsional - untuk persistensi)
    const submission = {
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        timestamp: timestamp
    };
    
    // Dapatkan pengiriman yang ada atau buat array baru
    let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    
    // Otomatis buka tab Gmail setelah jeda singkat
    setTimeout(() => {
        window.open(gmailUrl, '_blank');
    }, 1500);
}

/**
 * Sanitasi HTML untuk mencegah serangan XSS
 */
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// ============================================
// 6. SEND ANOTHER MESSAGE FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const sendAnotherBtn = document.getElementById('send-another');
    
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', function() {
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Show form and hide result
            document.getElementById('contact-form').classList.remove('hidden');
            document.getElementById('submission-result').classList.add('hidden');
            
            // Clear any errors
            clearErrors();
            
            // Scroll to form
            document.getElementById('contact-form').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    }
});

// ============================================
// 7. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchors (not just #)
            if (href !== '#' && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            }
        });
    });
});

// ============================================
// 8. FORM INPUT ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            const errorElement = this.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.classList.add('hidden');
                this.classList.remove('border-red-500');
            }
        });
    });
});

// ============================================
// 9. SCROLL ANIMATIONS (FADE IN ON SCROLL)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.glass-effect, .hover-lift');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// 11. AKORDEON SERTIFIKAT INTERAKTIF (PDF VIEWER)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        const header = card.querySelector('.cursor-pointer');
        const container = card.querySelector('.cert-pdf-container');
        const iframe = card.querySelector('iframe');
        const arrowIcon = card.querySelector('.arrow-icon');
        const pdfSrc = card.getAttribute('data-pdf');
        
        if (header && container && iframe && arrowIcon && pdfSrc) {
            header.addEventListener('click', function() {
                // Periksa apakah kartu sedang aktif/terbuka
                const isOpen = !container.classList.contains('h-0');
                
                // Tutup kartu lainnya untuk visual yang rapi
                certCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherContainer = otherCard.querySelector('.cert-pdf-container');
                        const otherIframe = otherCard.querySelector('iframe');
                        const otherArrow = otherCard.querySelector('.arrow-icon');
                        if (otherContainer && !otherContainer.classList.contains('h-0')) {
                            otherContainer.classList.add('h-0');
                            otherContainer.style.height = '0px';
                            if (otherArrow) otherArrow.classList.remove('rotate-180');
                            // Hapus src untuk menghemat RAM/CPU
                            if (otherIframe) otherIframe.src = '';
                        }
                    }
                });
                
                if (isOpen) {
                    // Tutup kartu
                    container.classList.add('h-0');
                    container.style.height = '0px';
                    arrowIcon.classList.remove('rotate-180');
                    // Bersihkan src iframe agar hemat RAM setelah transisi selesai
                    setTimeout(() => {
                        if (container.classList.contains('h-0')) {
                            iframe.src = '';
                        }
                    }, 500);
                } else {
                    // Set src ke iframe jika belum diset
                    if (!iframe.src || iframe.src === '' || iframe.src === window.location.href) {
                        iframe.src = pdfSrc + '#toolbar=0';
                    }
                    
                    // Buka kartu
                    container.classList.remove('h-0');
                    // Hitung tinggi konten asli untuk transisi tinggi yang dinamis
                    const contentHeight = container.scrollHeight;
                    container.style.height = contentHeight + 'px';
                    arrowIcon.classList.add('rotate-180');
                }
            });
        }
    });
});

/**
 * Console log for debugging (can be removed in production)
 */
console.log('Portfolio website JavaScript loaded successfully!');
console.log('Features: Mobile menu, Dynamic greeting, Form validation, Smooth scrolling, Gmail Integration, Cert Accordion');