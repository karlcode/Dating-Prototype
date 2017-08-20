<template>
  <v-layout column >
      <v-flex xs10 offset-xs1>
        <h2>Daddies</h2>
        <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex
            v-bind="{ [`xs${card.flex}`]: true }"
            v-for="card in cards"
            :key="card.title"
          >
            <v-card>
              <v-card-media
                :src="card.src"
                height="200px"
              >
              </v-card-media>
              <v-card-title primary-title>
              <div>
                <span class="headline" v-text="card.title">Josh Chase</span>
                
              </div>
              </v-card-title>
              <v-card-text v-text="card.title"></v-card-text>
              <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </v-flex>
    </v-layout>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Pre-fab homes', src: 'http://www.math.uni-frankfurt.de/~person/_4170854.jpg', flex: 4 },
        { title: 'Favorite road trips', src: 'https://cdn.shopify.com/s/files/1/0898/5824/products/SuperGirl_Web4_1024x1024.jpg?v=1499292991', flex: 4 },
        { title: 'Best airlines', src: 'https://www.thesun.co.uk/wp-content/uploads/2017/05/nintchdbpict000321168659.jpg?strip=all&w=960&quality=100', flex: 4 },
        { title: 'Pre-fab homes', src: 'http://www.math.uni-frankfurt.de/~person/_4170854.jpg', flex: 4 },
        { title: 'Favorite road trips', src: 'https://cdn.shopify.com/s/files/1/0898/5824/products/SuperGirl_Web4_1024x1024.jpg?v=1499292991', flex: 4 },
        { title: 'Best airlines', src: 'https://www.thesun.co.uk/wp-content/uploads/2017/05/nintchdbpict000321168659.jpg?strip=all&w=960&quality=100', flex: 4 },
        { title: 'Pre-fab homes', src: 'http://www.math.uni-frankfurt.de/~person/_4170854.jpg', flex: 4 },
        { title: 'Favorite road trips', src: 'https://cdn.shopify.com/s/files/1/0898/5824/products/SuperGirl_Web4_1024x1024.jpg?v=1499292991', flex: 4 },
        { title: 'Best airlines', src: 'https://www.thesun.co.uk/wp-content/uploads/2017/05/nintchdbpict000321168659.jpg?strip=all&w=960&quality=100', flex: 4 },
      ]
    })
  }
</script>