import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Despesa } from '../models/Despesa';


@Injectable({
    providedIn: 'root'
})

export class DespesaService {

    constructor( private httpClient : HttpClient)
    {
    }

    private readonly baseURL = environment["endPoint"];

    AdicionarDespesa(despesa:Despesa)
    {
        return this.httpClient.post<Despesa>(`${this.baseURL}/AdicionarDespesa`,
        despesa)
    }

    ListarDespesasUsuario(emailUsuario:string)
    {
        return this.httpClient.get(`${this.baseURL}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`);
    }
}
