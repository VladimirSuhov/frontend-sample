<template>
  <div>
    <div class="table-container">
      <div class="table-wrapper">
        <table class="table">
          <thead class="table__header">
          <tr class="table__row">
            <th v-for="(col, index) in columns" :key="index">
              {{ col }}
            </th>
          </tr>
          </thead>
          <tbody class="table__body">
          <tr v-for="(item, index) in displayedRecords"
              :key="index"
              @click="onRowClicked(item)"
              class="table__row">
              <td>{{ item.title }}</td>
              <td>{{ item.year }}</td>
              <td>{{ item.actor }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <nav class="pagination">
        <ul class="pagination__list">
          <li class="pagination__item">
            <button type="button" class="pagination__link" v-if="currentPage != 1" @click="currentPage--"> Previous </button>
          </li>
          <li class="pagination__item">
            <button type="button" class="pagination__link"
                    v-for="pageNumber in pages"
                    @click="currentPage = pageNumber"> {{pageNumber}} </button>
          </li>
          <li class="pagination__item">
            <button type="button" @click="currentPage++" v-if="currentPage < pages.length" class="pagination__link"> Next </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import Swal from "sweetalert2";

  export default {
    name: 'data-table',

    components: {},

    props: {
      records: [],
      rows: {},
    },

    data: () => ({
      columns: ['Title', 'Year', 'Actor'],
      perPage: 10,
      currentPage: 1,
      pages: [],
      movies: [
          {
            "title": "Skyfall",
            "year": 2012,
            "actor": "Daniel Craig",
            "director": "Sam Mendes"
          },
          {
            "title": "You Only Live Twice",
            "year": 1967,
            "actor": "Sean Connery",
            "director": "Lewis Gilbert"
          },
          {
            "title": "Die Another Day",
            "year": 2002,
            "actor": "Pierce Brosnan",
            "director": "Lee Tamahori"
          },
          {
            "title": "Octopussy",
            "year": 1983,
            "actor": "Roger Moore",
            "director": "John Glen"
          },
          {
            "title": "No Time To Die",
            "year": 2020,
            "actor": "Daniel Craig",
            "director": "Cary Joji Fukunaga"
          },
          {
            "title": "A View to a Kill",
            "year": 1985,
            "actor": "Roger Moore",
            "director": "John Glen"
          },
          {
            "title": "Spectre",
            "year": 2015,
            "actor": "Daniel Craig",
            "director": "Sam Mendes"
          },
          {
            "title": "Licence to Kill",
            "year": 1989,
            "actor": "Timothy Dalton",
            "director": "John Glen"
          },
          {
            "title": "Casino Royale",
            "year": 2006,
            "actor": "Daniel Craig",
            "director": "Martin Campbell"
          },
          {
            "title": "The Spy Who Loved Me",
            "year": 1977,
            "actor": "Roger Moore",
            "director": "Lewis Gilbert"
          },
          {
            "title": "Thunderball",
            "year": 1965,
            "actor": "Sean Connery",
            "director": "Terence Young"
          },
          {
            "title": "Golden Eye",
            "year": 1995,
            "actor": "Pierce Brosnan",
            "director": "Martin Campbell"
          },
          {
            "title": "The Living Daylights",
            "year": 1987,
            "actor": "Timothy Dalton",
            "director": "John Glen"
          },
          {
            "title": "For Your Eyes Only",
            "year": 1981,
            "actor": "Roger Moore",
            "director": "John Glen"
          },
          {
            "title": "Quantum of Solace",
            "year": 2008,
            "actor": "Daniel Craig",
            "director": "Marc Forster"
          },
          {
            "title": "The Man with the Golden Gun",
            "year": 1974,
            "actor": "Roger Moore",
            "director": "Guy Hamilton"
          },
          {
            "title": "On Her Majesty's Secret Service",
            "year": 1969,
            "actor": "George Lazenby",
            "director": "Peter R. Hunt"
          },
          {
            "title": "Goldfinger",
            "year": 1964,
            "actor": "Sean Connery",
            "director": "Guy Hamilton"
          },
          {
            "title": "From Russia with Love",
            "year": 1963,
            "actor": "Sean Connery",
            "director": "Terence Young"
          },
          {
            "title": "The World Is Not Enough",
            "year": 1999,
            "actor": "Pierce Brosnan",
            "director": "Michael Apted"
          },
          {
            "title": "Tomorrow Never Dies",
            "year": 1997,
            "actor": "Pierce Brosnan",
            "director": "Roger Spottiswoode"
          },
          {
            "title": "Dr. No",
            "year": 1962,
            "actor": "Sean Connery",
            "director": "Terence Young"
          },
          {
            "title": "Moonraker",
            "year": 1979,
            "actor": "Roger Moore",
            "director": "Lewis Gilbert"
          },
          {
            "title": "Diamonds Are Forever",
            "year": 1971,
            "actor": "Sean Connery",
            "director": "Guy Hamilton"
          },
          {
            "title": "Live and Let Die",
            "year": 1973,
            "actor": "Roger Moore",
            "director": "Guy Hamilton"
          }
      ]
    }),

    watch: {},

    computed: {
      sortedRecords() {
        return this.movies.sort(function(a,b) {
          return b.year - a.year;
        });
      },

      displayedRecords () {
        return this.paginate(this.sortedRecords);
      }
    },

    methods: {
      setPages () {
        const numberOfPages = Math.ceil(this.sortedRecords.length / this.perPage);
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
        }
      },

      paginate (posts) {
        const page = this.currentPage;
        const perPage = this.perPage;
        const from = (page * perPage) - perPage;
        const to = (page * perPage);
        return  posts.slice(from, to);
      },

      onRowClicked(item) {
        this.showIfoModal(item);
      },

      showIfoModal(data) {
        Swal.fire({
          type: "success",
          showCloseButton: false,
          allowOutsideClick:false,
          html: `
          <div>
              <div>Title - ${data.title}</div>
              <div>Year - ${data.year}</div>
              <div>Actor - ${data.actor}</div>
              <div>Director - ${data.director}</div>
          </div>
          `,
        });
      }
    },

    mounted() {
      this.setPages();
    },
  };
</script>

