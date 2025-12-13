<script setup></script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-column">
                <span class="brand">MEGA</span>
                <p class="footer-text">
                    Your one-stop destination for the latest and greatest games.
                </p>
            </div>

            <div class="footer-column">
                <h4>Creators</h4>
                <ul>
                    <li>Christopher <strong>DUBOIS</strong></li>
                    <li>Damien <strong>TINLOT</strong></li>
                    <li>Rainsong <strong>NGOUTSOP</strong></li>
                </ul>
            </div>

            <div class="footer-column">
                <h4>Contact & Info</h4>
                <div class="footer-item">
                    <i class="fa-solid fa-location-dot"></i>
                    <span> France, Villejuif</span>
                </div>
                <div class="footer-item">
                    <i class="fa-solid fa-building-columns"></i>
                    <span> Efrei Paris</span>
                </div>
                <div class="footer-item">
                    <i class="fa-solid fa-copyright"></i>
                    <span> 2025 MEGA</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #13121d;
    padding: 60px 5%;
    color: #e0e0e0;
    border-top: 1px solid #ffffff14;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-column {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.brand {
    font-size: 1.8em;
    font-weight: 800;
    color: #ff0055;
    letter-spacing: 1px;
}

.footer-text {
    line-height: 1.6;
    color: #a0a0a0;
    max-width: 300px;
}

h4 {
    color: #fff;
    font-size: 1.2em;
    margin-bottom: 5px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 10px;
    color: #aaa;
    transition: color 0.3s;
}

li:hover {
    color: #ff0055;
    cursor: pointer;
}

.footer-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #aaa;
}

@media (max-width: 768px) {
    .footer {
        padding: 40px 20px;
    }

    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 30px;
    }

    .footer-column {
        align-items: center;
    }

    .brand {
        margin-bottom: 10px;
    }
}
</style>
