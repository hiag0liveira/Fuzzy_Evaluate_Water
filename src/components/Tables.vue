<script setup></script>

<template>
  <h2>Tabela 1: Regras Fuzzy quando a aparencia da agua é boa</h2>
  <table>
    <tr>
      <th> </th>
      <th>Turbidez Boa</th>
      <th>Turbidez Adequada</th>
      <th>Turbidez Inadequada</th>
    </tr>
    <tr>
      <th>pH Inadequado Baixo</th>
      <td>Inadequada</td>
      <td>Inadequada</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH Adequado</th>
      <td>Adequada</td>
      <td>Adequada</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH Bom</th>
      <td>Boa</td>
      <td>Boa</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH inadequado alto</th>
      <td>Inadequada</td>
      <td>Inadequada</td>
      <td>Inadequada</td>
    </tr>
  </table>

  <h2>Tabela 2: Regras Fuzzy quando a aparencia da agua é adequada</h2>
  <table>
    <tr>
      <th></th>
      <th>Turbidez Boa</th>
      <th>Turbidez Adequada</th>
      <th>Turbidez Inadequada</th>
    </tr>
    <tr>
      <th>pH Inadequado Baixo</th>
      <td>Inadequada</td>
      <td>Inadequada</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH Adequado</th>
      <td>Adequada</td>
      <td>Adequada</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH Bom</th>
      <td>Boa</td>
      <td>Adequada</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH inadequado alto</th>
      <td>Inadequada</td>
      <td>Inadequada</td>
      <td>Inadequada</td>
    </tr>
  </table>

  <h2>Tabela 3: Regras Fuzzy quando a aparencia da agua é inadequada</h2>
  <table>
    <tr>
      <th></th>
      <th>Turbidez Boa</th>
      <th>Turbidez Adequada</th>
      <th>Turbidez Inadequada</th>
    </tr>
    <tr>
      <th>pH Inadequado Baixo</th>
      <td>Inadequada</td>
      <td>Inadequada</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH Adequado</th>
      <td>Inadequada</td>
      <td>Inadequada</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH Bom</th>
      <td>Adequada</td>
      <td>Adequada</td>
      <td>Inadequada</td>
    </tr>
    <tr>
      <th>pH inadequado alto</th>
      <td>Inadequada</td>
      <td>Inadequada</td>
      <td>Inadequada</td>
    </tr>
  </table>
</template>

<style scoped>
h2 {
  font-size: large;
}

table {
  border-collapse: collapse;
  width: 50%;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
