
var app = angular.module('pokedex', []);



app.factory('PokedexService', function($http){

  var pokedexService = {};

  pokedexService.getPokemons = function(callback) {
    $http.get('http://pokeapi.co/api/v1/pokedex/1/').then(function(response) {
      var answer = response.data.pokemon;
      callback(answer);
    },
    function(response) {
      var answer = null;
      callback(answer);
    });
  };

  pokedexService.getPokemon = function(pokemonResource, callback) {
    $http.get('http://pokeapi.co/' + pokemonResource).then(function(response) {
      var answer = response.data;
      callback(answer);
    },
    function(response) {
      var answer = null;
      callback(answer);
    });
  };

  pokedexService.getPokemonDescriptionById = function(id, callback) {
    // TODO: implementar código para recuperar os detalhes de um pokemon por seu id
    $http.get('http://pokeapi.co/api/v1/pokemon/' + id + '/' ).then(function(response) {
      var answer = response.data;
      callback(answer);
    },
    function(response) {
      var answer = null;
      callback(answer);
    });
  };

  return pokedexService;
});


app.controller('PokedexController', ['PokedexService', function(pokedexService){
  var self = this;
  self.pokemons = [];

  pokedexService.getPokemons(function(answer) {
    if (answer !== null) {
      self.pokemons = answer;
    }
  });

  this.getDetalhes = function(pokemonUrl) {
    pokedexService.getPokemon(pokemonUrl, function(answer) {
      if (answer !== null) {
        self.singlePokemon = answer;
      }
    });
  }

  this.getDetalhesID = function(pokemonUrl) {
    var idV = pokemonUrl.split("/");
    var id = idV[3];
    pokedexService.getPokemonDescriptionById(id, function(answer) {
      if (answer !== null) {
        self.singlePokemonDetails = answer;
      }
    });
  }

}]);
