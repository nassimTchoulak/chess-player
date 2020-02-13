import React from 'react';
import logo from './logo.svg';
import './App.css';
const Chess = require('react-chess') ;

const convert = ["a","b","c","d","e","f","g","h"] ;


const lineup = ['R@h1', 'P@f2', 'q@d8', 'R@a1', 'P@a2', 'P@c2', 'b@c8', 'p@d7', 'Q@d1', 'n@g8'] ;

const traduction = {
  "R":"K",
  "r":"k",

  "N":"Q",
  "n":"q",

  "p":"p",
  "P":"P",

  "T":"R",
  "t":"r",

  "F":"B",
  "f":"b",

  "C":"N",
  "c":"n"
}


class myApp extends React.Component {

  constructor(props){
    super(props);

    this.state = {

      game : [],
        pause:false

    }

  }
   start = () =>{


     let games = document.querySelector("#game").value;

     let time = Number( document.querySelector("#time").value ) ;

     let t = /--- coup N° [0-9]* ---\n/;


     //  games = games.replace(t,"") ;

     let array = games.split(t);

     array.shift();
    // array.pop();

     console.log(array);

     array[array.length - 1] = array[array.length - 1].replace(/Victoire de '[A-z]'/, "");

     let actual = 0 ;

    let clear = setInterval(()=>{

      if((actual)===array.length){
        clearInterval(clear);
        return 0 ;
      }


       let in_it = array[actual];
       let lines = in_it.split("\n");

       let lines2 = [];

       lines.forEach((i)=>{
         if(i!==""){
           lines2.push(i); // lines2 lines goes from 0 to 7
         }
       });

       let line__up = [] ;
       let chars = [] ;

       lines2.forEach((j,itr_line)=>{
         chars = j.split('');
         chars.forEach((ch , iter)=>{
          if(ch!==" ") {
            line__up.push(traduction[ch] + "@" + convert[iter] + (9-(itr_line+1)).toString());
          }

         })

       });


       this.setState({game:line__up});

       if(!this.state.pause) {
           actual++;
       }



     },time*200);


    // console.log(array);



};


  render() {
    return (
        <div className="App" style={{display: "flex"}}>

            <div style={{paddingTop:"20px"}}> <input type={"button"} value={" "+(()=>{
                if(this.state.pause){
                    return " start ? "
                }
                else{
                    return " pause ? "
                }
            })()+" "} onClick={()=>{
                this.setState({pause:!this.state.pause}) ;
            }} /></div>
          <div style={{width: "50%"}}>
            <textarea id="game" rows="30" cols="70"> </textarea>
            <div>=<input type="button" value="simulate _ game " onClick={this.start}/>

              <input id={"time"} type="number" defaultValue={"4"} placeholder="time in ms" required/>

            </div>


          </div>
          <div style={{width: "40%", height: "400px"}}>
            <Chess pieces={this.state.game}/>
          </div>

        </div>

    );

  }
}

export default myApp;
