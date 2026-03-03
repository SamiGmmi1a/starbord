import { defineStore } from 'pinia'
import { getAllComics } from '../api/comicsData'

export const useComicsStore = defineStore('comics', {
  state: () => ({
    comics: [],
    currentComic: null,
    searchResults: []
  }),

  actions: {
    async fetchComics() {
      // Utilise toujours les données locales avec le champ genre
      this.comics = getAllComics();
      return this.comics;
    },

    async fetchComicById(id) {
      try {
        const response = await fetch(`/api/comics/${id}`)
        if (!response.ok) throw new Error('Comic not found')
        this.currentComic = await response.json()
        return this.currentComic
      } catch (error) {
        console.error('Error fetching comic:', error)
        return null
      }
    },

    searchComics(query) {
      if (!query) {
        this.searchResults = []
        return
      }

      const lowerQuery = query.toLowerCase()
      this.searchResults = this.comics.filter(comic =>
        comic.title.toLowerCase().includes(lowerQuery) ||
        comic.author.toLowerCase().includes(lowerQuery)
      )
    }
  }
})
