"use strict";(self.webpackChunkquizzes=self.webpackChunkquizzes||[]).push([[592],{5467:(h,i,r)=>{r.d(i,{G:()=>n});var l=r(6689);let n=(()=>{class e{constructor(){this._gamesCount=0,this._correctAnswers=0,this._totalAnswers=0,this._totalScore=0,this._totalTime=0}getStats(){return this.fetchStatsFromLocalStorage(),{gamesCount:this._gamesCount,correctAnswers:this._correctAnswers,totalAnswers:this._totalAnswers,totalScore:this._totalScore,totalTime:this._totalTime}}updateStats(t){this.fetchStatsFromLocalStorage(),this._gamesCount+=1,this._correctAnswers+=t.correctAnswers,this._totalAnswers+=t.totalAnswers,this._totalScore+=Math.floor(t.correctAnswers/t.totalAnswers*100),this._totalTime+=t.answerTimeArray.reduce((s,o)=>s+o,0),this.saveStatsToLocalStorage()}clearStats(){this._gamesCount=0,this._correctAnswers=0,this._totalAnswers=0,this._totalScore=0,this._totalTime=0,this.saveStatsToLocalStorage()}fetchStatsFromLocalStorage(){if(!this._gamesCount){const t=localStorage.getItem("gamesCount");t&&(this._gamesCount=JSON.parse(t));const s=localStorage.getItem("correctAnswers");s&&(this._correctAnswers=JSON.parse(s));const o=localStorage.getItem("totalAnswers");o&&(this._totalAnswers=JSON.parse(o));const a=localStorage.getItem("totalScore");a&&(this._totalScore=JSON.parse(a));const c=localStorage.getItem("totalTime");c&&(this._totalTime=JSON.parse(c))}}saveStatsToLocalStorage(){localStorage.setItem("gamesCount",JSON.stringify(this._gamesCount)),localStorage.setItem("correctAnswers",JSON.stringify(this._correctAnswers)),localStorage.setItem("totalAnswers",JSON.stringify(this._totalAnswers)),localStorage.setItem("totalScore",JSON.stringify(this._totalScore)),localStorage.setItem("totalTime",JSON.stringify(this._totalTime))}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=l.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);