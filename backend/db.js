const { Client } = require('pg')


class DBAction{
  constructor(){
    this.createConn();
  }
  async createConn(){
    this.client = new Client({
      user: 'sakthi_project',
      host: '154.49.243.165',
      database: 'sakthi_project_db',
      password: 'password',
      port: 5432,
    })
    this.client.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
    this.client.on('error', e => {
      console.error('Database error', e);
      this.client = new Client({
        user: 'sakthi_project',
        host: '154.49.243.165',
        database: 'sakthi_project_db',
        password: 'password',
        port: 5432,
      })
      this.client.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    });
  }
  async showTable(){
    let q = await this.client.query("SELECT * FROM pg_catalog.pg_tables");
    let l = []
    q.rows.forEach(function(row){
      console.log(row.tablename)
    })
    return l;
  }
    
    async getTableData(tablename){
      let q = await this.client.query("SELECT * FROM "+tablename);
      let l = []
      q.rows.forEach(function(row){
        l.push(row);
      })
      return l;

    }
    getDataById(arr,id){
      let out ;
      arr.forEach((element)=>{
        if(element.id==id) out = element;
      })
      return out;
    }
    getDataByTrainId(arr,id){
      let out ;
      arr.forEach((element)=>{
        console.log(element);
        if(element.training_id==id) out = element;
      })
      return out;
    }
    clone(data){
      return JSON.parse(JSON.stringify(data));
  }
}


module.exports = {DBActionC:DBAction}