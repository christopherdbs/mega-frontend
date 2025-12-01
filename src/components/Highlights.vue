<script setup>

</script>

<template>
    <section class="highlights">
        <div class="highlights-left">
            <h1 class="game-title">Game Title</h1>
            <p class="game-description">

            Lorem ipsum dolor sit amet. Et quasi repudiandae in velit repellendus nam quia nulla ex ducimus impedit ut doloremque quibusdam eum voluptates optio. Quo totam molestias qui temporibus optio et dolorem nihil ut sequi incidunt et molestiae impedit quo quis alias in internos dolor. Non dolores dignissimos et dicta labore aut rerum aliquid et cumque aliquam sit pariatur vero! Aut culpa eius aut quam impedit id neque inventore.

            Qui dolor eius aut dolorum quia et voluptas nostrum. Non rerum quos vel accusantium molestias qui voluptatem labore et iste quam.

            Vel dolores aspernatur qui nulla perspiciatis eum reprehenderit blanditiis est error voluptas id omnis perferendis. Aut laborum quisquam id quaerat unde sed mollitia sunt in esse sint ea laboriosam fuga sed ipsam harum. Sed quidem libero non unde laboriosam et natus enim sed velit officiis hic repellat modi. Non dolor animi et voluptas molestiae sed totam numquam ea necessitatibus unde.
            </p>

            <div class="game-ratings">
                <p>Ratings⭐: <span style="color: green;">_</span>/100</p>
            </div>

            <div class="game-platforms">
                <div class="game-platform">
                    <div>PC</div>
                    <div>PS4</div>
                    <div>Xbox Series X</div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn-buy">Buy Now</button>
                <button class="btn-details">Game Review</button>
            </div>
        </div>
    </section>
</template>


<style>
.highlights {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 80px;
    background: 
        linear-gradient(to right, #1c1b29 38%, #1c1b2981 50%, #1c1b293f 75%, transparent 100%),
        url("../assets/witcher.jpg");
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;
}

.highlights-left {
    width: 30%;
}

.game-title {
    font-size: 45px;
    margin-bottom: 20px;
}

.game-description {
    line-height: 1.4;
    margin-bottom: 30px;
    text-align: justify;
}

.game-ratings {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 25px;
}

.game-platforms {
    text-align: center;
}

.game-platform {
    display: flex;
    justify-content: space-between;
    text-align: center;
    gap: 0px 5px;
    list-style: none;
    margin-bottom: 20px;
}

.game-platform div {
    color: darkgray;
    border: 1px solid darkgray;
    border-radius: 10px;
    padding: 5px 15px;
    width: 100%;
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.btn-buy {
    padding: 10px 30px;
    background: #DA1061;
    border: none;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
}

.btn-buy:hover {
    background: #b90d52;
}

.btn-details {
    padding: 10px 30px;
    background: transparent;
    border: 2px solid #DA1061;
    border-radius: 30px;
    color: #DA1061;
    font-size: 16px;
    cursor: pointer;
}

.btn-details:hover {
    border: 2px solid #b90d52;
    color: #b90d52;
}

.game-img {
    width: 100%;
    object-fit: contain;
}
</style>