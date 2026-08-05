import { createBeltRuntime } from "./belt-runtime";

export const redRuntime=createBeltRuntime({
  slug:"red",
  beltId:"BELT-RED",
  nextBeltId:"BELT-GREEN",
  label:"Vermelha",
  functionName:"Manifestar",
  nucleusStart:37,
  nucleusCount:12,
  pathIds:["PATH-C10","PATH-C11","PATH-C12"]
});
