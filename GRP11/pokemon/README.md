# Alunos

* Ezequiel Gomes Lopes - 01406995
 * Fabio mendeiros 10005596
 * Matheus Vinícius Gomes dos Santos-01355958




#Descrição
Este projeto consiste em um aplicativo desenvolvido com Ionic para buscar Pokémons e exibir suas informações com base no CEP fornecido. Além disso, o aplicativo permite capturar Pokémons e visualizar uma lista dos Pokémons capturados.

#Tecnologias Utilizadas
Ionic Framework: Usado para construir a interface do aplicativo.
Angular: Utilizado como framework principal para o desenvolvimento do aplicativo.
Capacitor: Empregado para integrar o aplicativo com funcionalidades nativas do dispositivo, como a câmera.
ViaCEP API: Utilizada para buscar informações de endereço com base no CEP fornecido.
PokeAPI: Utilizada para buscar informações sobre os Pokémons.


#Estrutura do Projeto
O projeto possui três abas principais:

Tab 1 (Caçar Pokémon): Permite buscar informações de um Pokémon com base no CEP fornecido.
Tab 2 (Batalhar): Permite capturar uma foto e comparar habilidades de Pokémons.
Tab 3 (Pokédex): Exibe uma lista de Pokémons capturados e um Pokémon aleatório.
Funções Implementadas
Função para Buscar Pokémon (tab1.page.ts):
typescript
Copiar código
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

#Descrição da Função
A função buscarPokemon realiza a busca de informações de um Pokémon com base no CEP fornecido. Ela formata o CEP, valida se está no formato correto e, se válido, utiliza a API ViaCEP para buscar informações de endereço e a PokeAPI para buscar informações do Pokémon.

Formatação e Validação do CEP:

formatCEP(this.areaBuscarPokemon): Formata o CEP fornecido.
isValidCEP(formattedCEP): Verifica se o CEP está no formato correto.
Busca de Informações de Endereço:

viaCEPService.getViaCEPService(formattedCEP).subscribe((value: any) => {...}): Chama a API ViaCEP e obtém informações como logradouro, bairro, localidade e UF.
Busca de Informações do Pokémon:

pokeApiService.getPokeApiService().subscribe((data: any) => {...}): Chama a PokeAPI e obtém informações como nome, imagem, habilidades, altura e peso do Pokémon.
saveCapturedPokemon(): Salva as informações do Pokémon capturado.
Através dessas funcionalidades, o aplicativo permite ao usuário buscar e visualizar informações detalhadas dos Pokémons com base no CEP fornecido.


Estrutura do Projeto
O projeto possui três abas principais:

Tab 1 (Caçar Pokémon): Permite buscar informações de um Pokémon com base no CEP fornecido.
Tab 2 (Batalhar): Permite capturar uma foto e comparar habilidades de Pokémons.
Tab 3 (Pokédex): Exibe uma lista de Pokémons capturados e um Pokémon aleatório.
Funções Implementadas
Função para Buscar Pokémon (tab1.page.ts):
typescript
Copiar código
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


#Função para Formatar o CEP (tab1.page.ts):
typescript
Copiar código
formatCEP(cep: string): string {
  return cep.replace(/\D/g, '');
}
Esta função formata o CEP removendo todos os caracteres não numéricos, garantindo que o CEP esteja no formato correto para a consulta.

Função para Validar o CEP (tab1.page.ts):
typescript
Copiar código
isValidCEP(cep: string): boolean {
  return /^[0-9]{8}$/.test(cep);
}
Esta função valida se o CEP fornecido está no formato correto (00000000), retornando verdadeiro se estiver e falso caso contrário.

##Função para Salvar o Pokémon Capturado (tab1.page.ts):
typescript
Copiar código
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
#Descrição das Funções
Função para Buscar Pokémon:

Realiza a formatação e validação do CEP.
Utiliza a API ViaCEP para buscar informações de endereço com base no CEP fornecido.
Utiliza a PokeAPI para buscar informações do Pokémon.
Salva os dados do Pokémon capturado.
Função para Formatar o CEP:

Remove todos os caracteres não numéricos do CEP, garantindo o formato correto para a consulta.
Função para Validar o CEP:

Verifica se o CEP está no formato correto (00000000), retornando verdadeiro se estiver e falso caso contrário.
Função para Salvar o Pokémon Capturado:

Carrega os Pokémons capturados do armazenamento local.
Adiciona o novo Pokémon capturado com seus dados (nome, imagem, vitórias, derrotas, empates).
Salva os Pokémons atualizados no armazenamento local.
Conclusão
O projeto PokémonApp é um exemplo de como utilizar o Ionic Framework em conjunto com Angular e Capacitor para desenvolver uma aplicação móvel moderna e funcional. A aplicação integra diversas APIs externas, como a ViaCEP e a PokeAPI, para fornecer uma experiência rica ao usuário. Através deste projeto, é possível entender como estruturar uma aplicação híbrida, implementar funcionalidades de busca e armazenamento de dados, além de utilizar recursos nativos do dispositivo como a câmera.

Este projeto demonstra a versatilidade e o poder das tecnologias escolhidas, mostrando como é possível construir uma aplicação completa que combina dados externos com recursos nativos, proporcionando uma interface amigável e intuitiva para o usuário.
