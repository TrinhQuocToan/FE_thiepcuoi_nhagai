const weddingInfo = {
    groomsName: "Ngọc Tiến",
    bridesName: "Hoàng Anh",
    weddingDate: "2026-08-02T14:45:00", // Countdow tới 14:45 02/08/2026
    dateString: "02/08/2026",
    heroTitle: "LỄ VU QUY",
    musicUrl: "assets/music/Lễ Đường.mp3",
    mapUrl: "https://maps.app.goo.gl/yGSiw5LjDviwe3M29?g_st=ic",

    family: {
        groom: {
            title: "Nhà trai",
            grandpa: "Đinh Ngọc Tuấn",
            grandma: "Vũ Thị Xen",
            address: "Phố Đông Hoa<br>Phường Hoa Lư<br>Tỉnh Ninh Bình"
        },
        bride: {
            title: "Nhà gái",
            grandpa: "Hoàng Sung",
            grandma: "Nguyễn Thị Lan Hương",
            address: "Thôn Nội Phật<br>Xã Bình Xuyên<br>Tỉnh Phú Thọ"
        }
    },

    footerThanks: "Sự hiện diện của Quý vị là niềm vinh hạnh cho gia đình chúng tôi!",
    footerEnd: "Rất hân hạnh được đón tiếp!",

    // Ban đầu có timeline nhưng đã được yêu cầu gỡ bỏ
    timeline: [],

    // Events
    events: [
        {
            title: "Tiệc Cưới",
            date: "Thứ Bảy - 01/08/2026<br><small>(19 tháng 06 năm Bính Ngọ)</small>",
            time: "17:30",
            location: "TƯ GIA NHÀ GÁI",
            address: "Thôn Nội Phật - Xã Bình Xuyên - Tỉnh Phú Thọ",
            icon: "glass"
        },
        {
            title: "Lễ Vu Quy",
            date: "Chủ Nhật - 02/08/2026<br><small>(20 tháng 06 năm Bính Ngọ)</small>",
            time: "09:00",
            location: "TƯ GIA NHÀ GÁI",
            address: "Thôn Nội Phật - Xã Bình Xuyên - Tỉnh Phú Thọ",
            icon: "ring"
        }
    ],

    // Banking
    banking: {
        main: {
            bank: "Vietcombank",
            name: "HOANG ANH",
            number: "0123456789",
            qr: "assets/images/1784171844747_4352902273896587581_4352902273896587581_c39c9ebeedf5d2f6ee05a3a04024fd19(1).jpg"
        }
    },

    // Gallery Images
    gallery: [
        "assets/images/A3T06245.jpg",
        "assets/images/A3T06287.jpg",
        "assets/images/A3T06300.jpg",
        "assets/images/A3T06373.jpg",
        "assets/images/A3T06516.jpg",
        "assets/images/A3T06524.jpg",
        "assets/images/A3T06829.jpg",
        "assets/images/A3T07059.jpg"
    ]
};

// ======================================
// MAIN LOGIC
// ======================================
document.addEventListener("DOMContentLoaded", () => {
    initDynamicData();
    initCountdown();
    initGallery();
    initEvents();
    initBanking();
    initRSVP();
    initScrollReveal();
    initPetals();
});

// SCROLL HANDLERS FOR FAB
function scrollToBank() {
    const bankSection = document.getElementById('banking');
    if (bankSection) {
        bankSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToMap() {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 1. OPEN INVITATION (WELCOME SCREEN)
function openInvitation() {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const audioContext = document.getElementById("bg-music");

    // Animation
    welcomeScreen.classList.add("envelope-open");

    setTimeout(() => {
        welcomeScreen.style.display = "none";
        mainContent.classList.remove("hidden");
        // Trigger reflow for animation
        void mainContent.offsetWidth;
        mainContent.classList.add("show");

        // Play music
        playAudio(audioContext);

        // Load wishes
        renderWishes();

    }, 1000);
}

// 2. AUDIO CONTROL
const musicToggleBtn = document.getElementById('music-toggle');
let isPlaying = false;

function playAudio(audioElem) {
    if (!audioElem.src || audioElem.src.includes('music-src-placeholder')) {
        // Using config url directly instead of getting from src to avoid browser absolute path mismatch
        audioElem.src = weddingInfo.musicUrl;
        audioElem.volume = 0.5;
        const playPromise = audioElem.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                isPlaying = true;
                if (musicToggleBtn) musicToggleBtn.classList.add('playing');
            })
                .catch(error => {
                    console.log("Auto-play blocked or audio file not found.", error);
                });
        }
    }
}

if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
        const audioElem = document.getElementById("bg-music");
        if (isPlaying) {
            audioElem.pause();
            musicToggleBtn.classList.remove('playing');
        } else {
            audioElem.play();
            musicToggleBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}

// 3. DYNAMIC DATA RENDER
function initDynamicData() {
    document.querySelectorAll('.grooms-name').forEach(el => el.innerText = weddingInfo.groomsName);
    document.querySelectorAll('.brides-name').forEach(el => el.innerText = weddingInfo.bridesName);
    document.querySelectorAll('.wedding-date-str').forEach(el => el.innerText = weddingInfo.dateString);
    document.querySelectorAll('.hero-subtitle').forEach(el => el.innerText = weddingInfo.heroTitle);

    // Family info
    const gTitle = document.querySelector('.family-groom-title');
    const gGra = document.querySelector('.family-groom-grandpa');
    const gGrma = document.querySelector('.family-groom-grandma');
    const gAdd = document.querySelector('.family-groom-address');
    if (gTitle) gTitle.innerText = weddingInfo.family.groom.title;
    if (gGra) gGra.innerText = weddingInfo.family.groom.grandpa;
    if (gGrma) gGrma.innerText = weddingInfo.family.groom.grandma;
    if (gAdd) gAdd.innerHTML = weddingInfo.family.groom.address;

    const bTitle = document.querySelector('.family-bride-title');
    const bGra = document.querySelector('.family-bride-grandpa');
    const bGrma = document.querySelector('.family-bride-grandma');
    const bAdd = document.querySelector('.family-bride-address');
    if (bTitle) bTitle.innerText = weddingInfo.family.bride.title;
    if (bGra) bGra.innerText = weddingInfo.family.bride.grandpa;
    if (bGrma) bGrma.innerText = weddingInfo.family.bride.grandma;
    if (bAdd) bAdd.innerHTML = weddingInfo.family.bride.address;

    // Footer info
    const footerThanks = document.querySelector('.footer-thanks');
    if (footerThanks) footerThanks.innerText = weddingInfo.footerThanks;

    const footerEnd = document.querySelector('.footer-end');
    if (footerEnd) footerEnd.innerText = weddingInfo.footerEnd;

    // Map link integration
    const mapBtn = document.getElementById('map-btn-link');
    const mapArea = document.getElementById('map-click-area');
    if (mapBtn) mapBtn.href = weddingInfo.mapUrl;
    if (mapArea) mapArea.addEventListener('click', () => {
        window.open(weddingInfo.mapUrl, '_blank');
    });
}

// 4. COUNTDOWN
function initCountdown() {
    const targetDate = new Date(weddingInfo.weddingDate).getTime();

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-minutes");
    const secsEl = document.getElementById("cd-seconds");

    if (!daysEl) return;

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minsEl.innerText = "00";
            secsEl.innerText = "00";
            document.getElementById("countdown-title").innerText = "Ngày Hạnh Phúc Đã Đến!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minsEl.innerText = minutes.toString().padStart(2, '0');
        secsEl.innerText = seconds.toString().padStart(2, '0');

    }, 1000);
}

// 5. TIMELINE REMOVED

// 6. GALLERY & LIGHTBOX
function initGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    weddingInfo.gallery.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal';
        item.innerHTML = `<img src="${url}" alt="Gallery image ${index + 1}" loading="lazy" onclick="openLightbox(${index})">`;
        grid.appendChild(item);
    });
}

let currentImageIndex = 0;
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = weddingInfo.gallery[index];
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function prevImage(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + weddingInfo.gallery.length) % weddingInfo.gallery.length;
    document.getElementById('lightbox-img').src = weddingInfo.gallery[currentImageIndex];
}

function nextImage(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % weddingInfo.gallery.length;
    document.getElementById('lightbox-img').src = weddingInfo.gallery[currentImageIndex];
}

// 7. EVENTS RENDER
function initEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    weddingInfo.events.forEach((item, idx) => {
        // SVG simple icons are removed in Sora, replaced with top circular image
        const imgUrl = idx === 0
            ? "assets/images/A3T06702.jpg"
            : "assets/images/A3T06733.jpg";

        const html = `
            <div class="event-card reveal">
                <div class="event-card-circle" style="background-image: url('${imgUrl}')"></div>
                <div class="event-detail">
                    <h3>${item.title}</h3>
                    <p><strong>Ngày:</strong><br>${item.date}</p>
                    <p><strong>Giờ đón khách:</strong><br>${item.time}</p>
                    <p><strong>Địa điểm:</strong><br><span style="color: var(--color-sage-green); font-weight:600; font-size:1.1rem;">${item.location}</span><br><em>${item.address}</em></p>
                </div>
            </div>
        `;
        eventsContainer.insertAdjacentHTML('beforeend', html);
    });
}

// 8. BANKING QR RENDER
function initBanking() {
    const mainBox = document.getElementById('qr-main');

    if (mainBox && weddingInfo.banking && weddingInfo.banking.main) {
        mainBox.querySelector('.bank-qr').src = weddingInfo.banking.main.qr;
        mainBox.querySelector('.bank-name').innerText = weddingInfo.banking.main.bank;
        mainBox.querySelector('.acc-name').innerText = weddingInfo.banking.main.name;
        mainBox.querySelector('.acc-number').innerText = weddingInfo.banking.main.number;
    }
}

// 9. GUESTBOOK FORM & WISHES (API INTEGRATION)
function initRSVP() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('rsvp-name').value.trim();
        const message = document.getElementById('rsvp-message').value.trim();
        const btn = document.getElementById('submit-wish-btn');

        if (!name || !message) {
            alert("Vui lòng điền đủ tên và lời nhắn nhủ!");
            return;
        }

        // Disable button while processing
        btn.disabled = true;
        btn.innerText = "Đang gửi...";

        try {
            const response = await fetch('https://be-thiepcuoi-atien.onrender.com/api/wishes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message })
            });

            if (response.ok) {
                // Show success message
                form.innerHTML = `<div class="success-msg" style="color: var(--color-dark-green); text-align:center; padding:2rem; font-size:1.1rem; border: 1px dashed var(--color-sage-green); border-radius: 12px; font-weight:600;">Cảm ơn ${name} vì lời chúc ý nghĩa! ❤️</div>`;
                // Reload wishes list
                renderWishes();
            } else {
                alert("Đã có lỗi xảy ra, vui lòng thử lại sau.");
                btn.disabled = false;
                btn.innerText = "Gửi Lời Chúc";
            }
        } catch (error) {
            console.error("Lỗi khi gửi form:", error);
            alert("Lỗi kết nối tới máy chủ.");
            btn.disabled = false;
            btn.innerText = "Gửi Lời Chúc";
        }
    });
}

async function renderWishes() {
    const container = document.getElementById('wishes-container');
    if (!container) return;

    try {
        const response = await fetch('https://be-thiepcuoi-atien.onrender.com/api/wishes');
        if (!response.ok) throw new Error("API failed");
        const wishes = await response.json();

        container.innerHTML = '';

        if (!wishes || wishes.length === 0) {
            container.innerHTML = '<p class="no-wishes">Hãy là người đầu tiên gửi lời chúc tốt đẹp tới cô dâu và chú rể nhé!</p>';
            return;
        }

        wishes.forEach(w => {
            const dateStr = new Date(w.createdAt).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
            const html = `
                <div class="wish-card" style="animation: fadeInUp 0.8s ease forwards;">
                    <div class="wish-header">
                        <p class="wish-name">${w.name}</p>
                        <p class="wish-time">${dateStr}</p>
                    </div>
                    <p class="wish-text">${w.message}</p>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });

    } catch (error) {
        console.error("Lỗi khi load lời chúc:", error);
        container.innerHTML = '<p class="no-wishes">Không thể kết nối đến máy chủ Sổ lưu bút.</p>';
    }
}

// 10. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Scroll to top button
    const topBtn = document.getElementById('scroll-top-btn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                topBtn.classList.add('show');
            } else {
                topBtn.classList.remove('show');
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// 11. CHERRY BLOSSOMS (HOA ĐÀO RƠI)
function initPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    // Mật độ rơi vừa phải
    const petalCount = 20;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Random size từ 8px - 14px
        const size = Math.random() * 6 + 8;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        // Vị trí ngang random toàn màn hình
        petal.style.left = `${Math.random() * 100}vw`;

        // Thời gian rơi chậm nhẹ nhàng (12s - 20s)
        const fallDuration = Math.random() * 8 + 12;
        // Delay âm để hoa có mặt sẵn trên màn ngay khi load 
        const fallDelay = Math.random() * -15;

        petal.style.animationDuration = `${fallDuration}s, ${fallDuration / 2}s`;
        petal.style.animationDelay = `${fallDelay}s, ${fallDelay}s`;

        container.appendChild(petal);
    }
}
