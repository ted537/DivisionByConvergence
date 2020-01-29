import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputA:'',
      inputB:'',
      stages:[]
    }
  }

  compute() {
    const {inputA,inputB} = this.state;
    const A = Number.parseFloat(inputA);
    const B = Number.parseFloat(inputB);
    if (!A || !B) {
      alert("input is weird. aborting");
      return;
    }
    const stages = [{
      A,B,
      F:1,
      i:-1
    }];
    for (let i=0;i<10;++i) {
      const prev = stages[stages.length-1];
      const F = 2-prev.B;
      const next = {
        A:prev.A*F,
        B:prev.B*F,
        F,
        i
      };
      stages.push(next);
    }
    this.setState({stages});
  }

  render() {
    const {inputA,inputB,stages} = this.state;

    return <div>
      <h1>Division by Convergence Calculator</h1>
      <div>
        Compute A/B
      </div>
      <div>
        <label>A</label>
        <input value={inputA} onChange={ev=>this.setState({inputA:ev.target.value})} />
      </div>
      <div>
        <label>B</label>
        <input value={inputB} onChange={ev=>this.setState({inputB:ev.target.value})} />
      </div>
      <div>
        <button onClick={()=>this.compute()}>Go</button>
      </div>
      <hr />
      {stages.slice(1).map(stage=>(
        <div key={stage.i}>
          <div>F{stage.i} {stage.F}</div>
          <div>A{stage.i}: {stage.A}</div>
          <div>B{stage.i}: {stage.B}</div>
          <hr />
        </div>
      ))}
    </div>
  }
}

export default App;
