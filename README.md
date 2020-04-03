# Parabains Bot

Monorepo utilizado para controlar [essa conta](https://twitter.com/parabainsbot) no Twitter que dá parabéns às pessoas.

## Visão geral

O Twitter tem [diversas APIs](https://developer.twitter.com/en/docs/tweets/search/overview) para buscar e interagir com os tweets e seus usuários. Atualmente este app só utiliza a [API standard](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets) que possui algumas [limitações](https://developer.twitter.com/en/docs/basics/rate-limits). Estamos estudando a possibilidade de utilizar a [API premium](https://developer.twitter.com/en/docs/tweets/search/overview/premium), já que ela oferece a _feature_ de paginação e limites mais brandos.

## Tecnologias

Este app utiliza duas linguagens principais até agora:

- Javascript: utilizado para interagir e controlar a conta do Twitter, ou seja, favoritar, retweetar e responder.
- Python: Devido as limitações da API standard, é necessário fazer o melhor uso dos limites de favoritos, retweets e respostas. Dessa forma, esse app utiliza Machine Learning (ML) para fazer o processamento de linguagem natural e predizer se a interação com o tweet deve ser feita. Libs de ML escritas em python são as mais populares, como [sklearn](https://scikit-learn.org/stable/modules/classes.html) e [tensorflow](https://www.tensorflow.org/api_docs/python/tf).
