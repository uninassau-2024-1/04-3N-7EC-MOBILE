* Fagner Alves da Costa  - 01319957
  
* João Fernando Correia da Silva - 01344679
  
* Matheus Vinícius Gomes dos Santos - 01355958
  
* Vinicius Gutemberg Araújo Lima - 01435396

# PokémonApp

## Descrição

Este projeto é um aplicativo Ionic para buscar Pokémons e exibir suas informações com base no CEP fornecido. O aplicativo também permite capturar Pokémons e visualizar uma lista de Pokémons capturados.

## Tecnologias Usadas

-**Ionic Framework**: Utilizado para construir a interface do aplicativo.
-**Angular**: Utilizado como framework principal para o desenvolvimento do aplicativo.
-**Capacitor**: Utilizado para integrar o aplicativo com funcionalidades nativas do dispositivo, como a câmera.
-**ViaCEP API**: Utilizada para buscar informações de endereço com base no CEP fornecido.
-**PokeAPI**: Utilizada para buscar informações de Pokémons.

## Estrutura do Projeto

O projeto possui três abas principais:
1.**Tab 1 (Caçar Pokémon)**: Permite buscar informações de um Pokémon com base no CEP fornecido.
2.**Tab 2 (Batalhar)**: Permite capturar uma foto e comparar habilidades de Pokémons.
3.**Tab 3 (Pokedéx)**: Exibe uma lista de Pokémons capturados e um Pokémon aleatório.

## Funções Implementadas

### 1. Função para Buscar Pokémon (`tab1.page.ts`)

```
buscarPokemon() {
  const formattedCEP = this.formatCEP(this.areaBuscarPokemon);
  if (!this.isValidCEP(formattedCEP)) {
    alert('Por favor, insira um CEP válido no formato 00000-000 ou 00000000.');
    return;
  }  this.viaCEPService.getViaCEPService(formattedCEP).subscribe((value: any) => {
    this.areaBusca.logradouro = value.logradouro;
    this.areaBusca.bairro = value.bairro;
    this.areaBusca.localidade = value.localidade;
    this.areaBusca.uf = value.uf;
  });  this.pokeApiService.getPokeApiService().subscribe((data: any) => {
    this.pokemonData = {
      name: data.name.toUpperCase(),
      image: data.sprites.other['official-artwork'].front_default,
      abilities: data.abilities.length,
      height: data.height,
      weight: data.weight,
    };
    this.saveCapturedPokemon();
  });
}
```

---

> 1. Esta função busca informações de um Pokémon com base no CEP fornecido pelo usuário. Ela formata o CEP, valida seu formato e, se válido, faz duas requisições: uma para a ViaCEP API para obter informações de endereço, e outra para a PokeAPI para obter informações do Pokémon. Após obter os dados, a função salva o Pokémon capturado.

### 2. Função para Formatar o CEP (`tab1.page.ts`)

```
formatCEP(cep: string): string {
  return cep.replace(/\D/g, '');
}
```

---

> 2. Esta função formata o CEP removendo todos os caracteres não numéricos, garantindo que o CEP esteja no formato correto para a consulta.

### 3. Função para Validar o CEP (`tab1.page.ts`)

```
isValidCEP(cep: string): boolean {
  return/^[0-9]{8}$/.test(cep);
}
```

---

> 3. Esta função valida se o CEP fornecido está no formato correto (00000000), retornando verdadeiro se estiver e falso caso contrário.

### 4. Função para Salvar o Pokémon Capturado (`tab1.page.ts`)

```
saveCapturedPokemon() {
  const capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');
  capturedPokemons.push({
    name: this.pokemonData.name,
    image: this.pokemonData.image,
    victories: Math.floor(Math.random() * 10),
    defeats: Math.floor(Math.random() * 10),
    draws: Math.floor(Math.random() * 10)
  });
  localStorage.setItem('capturedPokemons', JSON.stringify(capturedPokemons));
  localStorage.setItem('tab1Abilities', this.pokemonData.abilities.toString());
}
```

---

> 4. Esta função salva os dados do Pokémon capturado no armazenamento local do navegador, permitindo que os dados sejam persistidos entre as sessões de uso do aplicativo.

### 5. Função para Capturar Foto (`tab2.page.ts`)

```
addPhotoToGallery() {
  this.photoService.addNewToGallery();
}
```

---

> 5. Esta função utiliza o serviço `PhotoService` para capturar uma nova foto e adicioná-la à galeria do dispositivo.

### 6. Função para Carregar um Pokémon Aleatório (`tab2.page.ts` e `tab3.page.ts`)

```
loadRandomPokemon() {
  this.pokeApiService.getPokeApiService().subscribe((data: any) => {
    this.pokemon = {
      name: data.name,
      image: data.sprites.front_default,
      victories: Math.floor(Math.random() * 10),
      defeats: Math.floor(Math.random() * 10),
      draws: Math.floor(Math.random() * 10)
    };
  });
}
```

---

> 6. Esta função faz uma requisição à PokeAPI para obter um Pokémon aleatório e suas informações. Os dados do Pokémon são então armazenados em um objeto `pokemon`.

### 7. Função para Comparar Habilidades dos Pokémons (`tab2.page.ts`)

```
comparePokemon() {
  const tab1Abilities = parseInt(localStorage.getItem('tab1Abilities') || '0', 10);
  const pokemonNameElement = document.getElementById('pokemonName');
  if (pokemonNameElement) {
    if (this.pokemon.abilities > tab1Abilities) {
      this.battleResult = ${this.pokemon.name} Ganhou;
      pokemonNameElement.style.color = 'red';
    } elseif (this.pokemon.abilities < tab1Abilities) {
      this.battleResult = ${this.pokemon.name} Perdeu;
      pokemonNameElement.style.color = 'green';
    } else {
      this.battleResult = ${this.pokemon.name} Empate;
      pokemonNameElement.style.color = 'yellow';
    }
  }
}
```

---

> 7. Esta função compara as habilidades do Pokémon capturado com as habilidades do Pokémon buscado na `tab1`. Dependendo do resultado, ela atualiza o texto e a cor para indicar vitória, derrota ou empate.

### 8. Função para Carregar Pokémons Capturados (`tab3.page.ts`)

```
loadCapturedPokemons() {
  this.capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');
}
```

---

> 8. Esta função carrega os dados dos Pokémons capturados do armazenamento local do navegador, permitindo que eles sejam exibidos na `tab3`.

## Conclusão

O PokémonApp é um exemplo de como utilizar o Ionic Framework em conjunto com Angular e Capacitor para desenvolver uma aplicação móvel moderna e funcional. A aplicação integra diversas APIs externas, como a ViaCEP e a PokeAPI, para fornecer uma experiência rica ao usuário. Através deste projeto, é possível entender como estruturar uma aplicação híbrida, implementar funcionalidades de busca e armazenamento de dados, além de utilizar recursos nativos do dispositivo como a câmera.

Este projeto demonstra a versatilidade e o poder das tecnologias escolhidas, mostrando como é possível construir uma aplicação completa que combina dados externos com recursos nativos, proporcionando uma interface amigável e intuitiva para o usuário.
