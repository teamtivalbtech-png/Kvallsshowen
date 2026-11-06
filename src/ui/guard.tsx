import React from 'react';
/** Fångar renderingsfel så att ett fel i ett spel aldrig ger svart skärm. `keyed` återställer när innehållet byts. */
export class Guard extends React.Component<{fallback?:any,onError?:(e:any)=>void,keyed?:any,children?:any},{bad:boolean}>{
  state={bad:false};
  static getDerivedStateFromError(){return{bad:true}}
  componentDidCatch(e:any){console.error(e);this.props.onError?.(e)}
  componentDidUpdate(p:any){if(this.state.bad&&p.keyed!==this.props.keyed)this.setState({bad:false})}
  render(){return this.state.bad?(this.props.fallback??null):this.props.children}
}
