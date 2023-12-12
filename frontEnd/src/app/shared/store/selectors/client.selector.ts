import { createFeatureSelector } from "@ngrx/store";
import { clientInterface } from "../../interface/client.interface";

const getClientState = createFeatureSelector<clientInterface>('client')