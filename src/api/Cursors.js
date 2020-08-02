import axios from 'react-native-axios';

const BASE_URL = 'http://ergast.com/api/f1';

const CURSOR_INIT = {
  page: 0,
  pages: '...',
  loading: false,
  total: 0,
};

class DataCursor {
  constructor(api, cursor = {offset: 0, limit: 20}) {
    this.api = api;
    this.cursor = {
      ...cursor,
      ...CURSOR_INIT,
    };
  }

  fetch = async (page = 0) => {
    if (page < 0 || (this.cursor.pages && page >= this.cursor.pages)) {
      return null;
    }

    this.cursor.offset = this.cursor.limit * page;
    const query = `offset=${this.cursor.offset}&limit=${this.cursor.limit}`;
    const res = await axios.get(`${BASE_URL}/${this.api}.json?${query}`);
    if (!res.data || !res.data.hasOwnProperty('MRData')) {
      throw Error(
        `AXIOS: data filed is null, or "MRData" field is missing ( ${res.status} / ${res.statusText} )`,
      );
    }

    const {MRData} = res.data;
    this.cursor.total = MRData.total;
    this.cursor.pages = Math.ceil(this.cursor.total / this.cursor.limit);
    this.cursor.page = Math.floor(this.cursor.offset / this.cursor.limit);
    return MRData;
  };

  reset = () => {
    this.cursor = {
      ...this.cursor,
      ...CURSOR_INIT,
    };
  };

  normalize = (recs) => {
    if (!recs) {
      if (this.result) {
        return this.result;
      }
      throw Error(
        `[DataCursor::normalize] api "${this.api}" returns no records !`,
      );
    }
    this.result = {items: recs, cursor: this.cursor};
    return this.result;
  };
}

class SeasonDetails extends DataCursor {
  constructor(season, cursor = {offset: 0, limit: 5}) {
    super(season, cursor);
  }
  move = async (direction) => {
    try {
      const res = await this.fetch(direction);
      return this.normalize(res?.RaceTable?.Races);
    } catch (e) {
      console.log(e.message);
      return {error: e.message, state: this.cursor};
    }
  };
}

class Seasons extends DataCursor {
  constructor() {
    super('seasons');
  }
  move = async (direction) => {
    try {
      const res = await this.fetch(direction);
      return this.normalize(res?.SeasonTable?.Seasons);
    } catch (e) {
      console.log('Seasons', e);
      return {error: e.message, state: this.cursor};
    }
  };
}

class Results extends DataCursor {
  constructor() {
    super('qualifying');
  }
  move = async (direction) => {
    try {
      const res = await this.fetch(direction);
      return this.normalize(res?.RaceTable?.Races);
    } catch (e) {
      return {error: e.message, state: this.cursor};
    }
  };
}

class Constructors extends DataCursor {
  constructor() {
    super('constructors');
  }
  move = async (direction) => {
    try {
      const res = await this.fetch(direction);
      return this.normalize(res?.ConstructorTable?.Constructors);
    } catch (e) {
      console.log(e.message);
      return {error: e.message, state: this.cursor};
    }
  };
}

const Cursors = {
  seasons: new Seasons(),
  results: new Results(),
  constructors: new Constructors(),
};

export {CURSOR_INIT, Cursors, SeasonDetails};
