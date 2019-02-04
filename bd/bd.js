const fs = require('fs');

module.exports = {
  getAll: () => {
    try {
      return JSON.parse(fs.readFileSync(`${__dirname}/bd_data.json`, 'utf8'));
    } catch (err) {
      console.log(err);
      fs.writeFileSync(`${__dirname}/bd_data.json`, JSON.stringify({}), 'utf8');
      return {};
    }
  },

  getOne: (id) => {
    try {
      const fileItem = JSON.parse(fs.readFileSync(`${__dirname}/bd_data.json`, 'utf8'))[id];

      if (!fileItem) {
        return null;
      }

      return fileItem;
    } catch (err) {
      console.log(err);
    }
  },

  updateOne: ({ id, data } = {}) => {
    try {
      const file = JSON.parse(fs.readFileSync(`${__dirname}/bd_data.json`, 'utf8'));
      if (!file[id]) {
        return null;
      }

      file[id] = data;
      fs.writeFileSync(`${__dirname}/bd_data.json`, JSON.stringify(file), 'utf8');

      return file[id];
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  create: (data = {}) => {
    try {
      const file = JSON.parse(fs.readFileSync(`${__dirname}/bd_data.json`, 'utf8'));
      const fileKeys = Object.keys(file);
      const newId = fileKeys.length ? ++file[fileKeys[fileKeys.length - 1]].id : 1;
      file[newId] = {
        ...data,
        id: newId
      };

      fs.writeFileSync(`${__dirname}/bd_data.json`, JSON.stringify(file), 'utf8');

      return file[newId];
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  delete: (id) => {
    try {
      const file = JSON.parse(fs.readFileSync(`${__dirname}/bd_data.json`, 'utf8'));
      if (!file[id]) {
        return null;
      }
      
      delete file[id];

      fs.writeFileSync(`${__dirname}/bd_data.json`, JSON.stringify(file), 'utf8');

      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
