<script setup>
import Interaction from './Interaction.vue'

</script>

<template>
    <body class="py-5">
        <div class="container px-4 container1">
            <!-- Logo -->
            <div class="text-center">
                <h3>Sistema baseado em regras fuzzy para avaliação da qualidade da água</h3>
                <img class="img-fluid topLogo mt-4 mb-3 " src="../../public/logo.png" alt="LPlogo">
            </div>
            <div class="text-center"><Interaction></Interaction></div>
        </div>

        <!-- copyRight -->
        <div class="container text-center footer">
            <p>Feito por Bruno Nascimento e Hiago Oliveira &copy;Todos os direitos reservados - 2023</p>
        </div>
    </body>
</template>
<style scoped>
body {
    margin: 0;
    padding: 0;
}
.container1 {
    background-color: rgba(255, 255, 255, 0.945);
    width: 1200px;
    height: auto;
    border-radius: 3%;
    padding-top: 20px;
}

.topLogo {
    width: 150px;
}

.paragraph {
    margin: 8px 0px;
}
h3{
    color: black;
}


.footer {
    margin-top: 30px;
    margin-bottom: -30px;
    color: black;
    background-color: white;
    width: 100%;
    left: 0;
    right: 0;
}

</style>