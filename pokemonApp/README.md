* João Fernando Correia da Silva - 01344679
* Vinicius Gutemberg Araújo Lima - 01435396
* Fagner Alves da Costa  - 01319957


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


buscarPokemon() {
  const formattedCEP = this.formatCEP(this.areaBuscarPokemon);
  if (!this.isValidCEP(formattedCEP)) {
    alert('Por favor, insira um CEP válido no formato 00000-000 ou 00000000.');
    return;
  }

  this.viaCEPService.getViaCEPService(formattedCEP).subscribe((value: any) => {
    this.areaBusca.logradouro = value.logradouro;
    this.areaBusca.bairro = value.bairro;
    this.areaBusca.localidade = value.localidade;
    this.areaBusca.uf = value.uf;
  });

  this.pokeApiService.getPokeApiService().subscribe((data: any) => {
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


### 2. Função para Formatar o CEP (`tab1.page.ts`)

formatCEP(cep: string): string {
  return cep.replace(/\D/g, '');
}


### 3. Função para Validar o CEP (`tab1.page.ts`)

isValidCEP(cep: string): boolean {
  return/^[0-9]{8}$/.test(cep);
}



### 4. Função para Salvar o Pokémon Capturado (`tab1.page.ts`)

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



### 5. Função para Capturar Foto (`tab2.page.ts`)

addPhotoToGallery() {
  this.photoService.addNewToGallery();
}


### 6. Função para Carregar um Pokémon Aleatório (`tab2.page.ts` e `tab3.page.ts`)

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


### 7. Função para Comparar Habilidades dos Pokémons (`tab2.page.ts`)

comparePokemon() {
  const tab1Abilities = parseInt(localStorage.getItem('tab1Abilities') || '0', 10);
  const pokemonNameElement = document.getElementById('pokemonName');
  if (pokemonNameElement) {
    if (this.pokemon.abilities > tab1Abilities) {
      this.battleResult = `${this.pokemon.name} Ganhou`;
      pokemonNameElement.style.color = 'red';
    } elseif (this.pokemon.abilities < tab1Abilities) {
      this.battleResult = `${this.pokemon.name} Perdeu`;
      pokemonNameElement.style.color = 'green';
    } else {
      this.battleResult = `${this.pokemon.name} Empate`;
      pokemonNameElement.style.color = 'yellow';
    }
  }
}


### 8. Função para Carregar Pokémons Capturados (`tab3.page.ts`)

loadCapturedPokemons() {
  this.capturedPokemons = JSON.parse(localStorage.getItem('capturedPokemons') || '[]');
}


## Executando o Projeto

Para executar o projeto, siga os passos abaixo:

1. Clone o repositório.
2. Instale as dependências:

   `npm install`
3. Execute o projeto:

   `ionic serve`

## Conclusão

Este aplicativo é um exemplo de como usar Ionic, Angular, e APIs externas para construir uma aplicação móvel com funcionalidades avançadas, como busca por CEP e exibição de dados de Pokémons.
