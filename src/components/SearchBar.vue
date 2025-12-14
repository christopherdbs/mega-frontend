<script setup></script>

<template>
    <div class="search">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input class="search"></input>
    </div>
</template>

<style scoped>
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    position: relative;
    transition: width 0.2s ease-in-out;
}

.search i{
    position: absolute;
    color: white;
    left: 7px;
}

.search input{
    background-color: rgba(0,0,0,0);
    border: #ff0055 solid 1px;
    outline: none;
    border-radius: 14px;
    height: 25px;
    color:white;
    padding-left: 30px ;
}

.search input:focus{
    background-color: #ff0055;
}
.search-icon{
    color:white;
    z-index:10;
}
</style>
