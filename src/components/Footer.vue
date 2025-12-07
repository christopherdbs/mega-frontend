<script setup>

</script>

<template>
    <footer class="footer">
        <div class="footer-left">
            <span class="brand">Logo<strong> MEGA</strong></span>
            <p class="footer-description">
                Description
            </p>
        </div>

        <div class="footer-right">
            <div class="footer-item">
                <i class="fa-solid fa-location-dot"></i>
                <span> France, Villejuif</span>
            </div>

            <div class="divider"></div>

            <div class="footer-item">
                <i class="fa-solid fa-building-columns"></i>
                <span> Efrei Paris</span>
            </div>
        </div>
    </footer>
</template>
    
<style>
.footer {
    background-color: #13121d;
    padding: 14px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 14px;
    border-top: 1px solid #ffffff14;
}

.footer-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
}

.footer-right {
    display: flex;
    align-items: center;
    gap: 15px;
}

.divider {
    height: 16px;
    width: 1px;
    background-color: #ffffff26;
}

@media (max-width : 600px) {
    .footer {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }

    .footer-right {
        justify-content: center;
    }
}
</style>