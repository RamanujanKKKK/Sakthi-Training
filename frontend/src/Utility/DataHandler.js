class DataHandler{
    constructor(dataHandler){
        this.dataHandler = dataHandler;
    }
    addDepartment(data,dept){
        data = this.clone(data);
        console.log(100);
        data.filter.department = [...data.filter.department,dept];
        this.dataHandler(data);
    }
    addTraining(data,training){
        data = this.clone(data);
        data.filter.training = [...data.filter.training,training];
        this.dataHandler(data);
    }
    removeTraining(data,training){
        data = this.clone(data);
        data.filter.training = data.filter.training.filter(ele=>ele.name!=training.name)
        this.dataHandler(data);
    }
    removeDepartment(data,dept){
        data = this.clone(data);
        data.filter.department = data.filter.department.filter(ele=>ele.name!=dept.name)

        this.dataHandler(data);
    }
    clone(data){
        return JSON.parse(JSON.stringify(data));
    }
    getDataById(arr,id){
        let out;
        arr.forEach(element => {
            if(element.id==id) out=element;            
        });
        return out;
    }
    getDeptById(data,id){
        let out;
        data.department.forEach((ele)=>{
            if(ele.id==id){
                out = ele;
            }
        })
        return out;
    }
    getTrainingById(data,id){
        let out;
        data.training.forEach((ele)=>{
            if(ele.id==id){
                out = ele;
            }
        })
        return out;
    }
    getTrainerById(data,id){
        let out;
        data.trainer.forEach((ele)=>{
            if(ele.id==id){
                out = ele;
            }
        })
        return out;
    }
    inverseFilter(data){
        data = this.clone(data);
        data.filter.training = data.training.filter(x => data.filter.training.filter(y=>y.id==x.id).length==0);
        data.filter.department = data.department.filter(x => data.filter.department.filter(y=>y.id==x.id).length==0);
        this.dataHandler(data);
    }
    emptyFilter(data){
        data = this.clone(data);
        data.filter.training = [];
        data.filter.department = [];
        this.dataHandler(data);
    }
    fillFilter(data){
        data = this.clone(data);
        data.filter.training = data.training;
        data.filter.department = data.department;
        this.dataHandler(data);
    }
}

export default DataHandler;