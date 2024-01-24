import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { SistemaFinanceiro } from '../models/SistemaFinanceiro';


@Injectable({
  providedIn: 'root'
})

export class SistemaService {

  constructor( private httpClient : HttpClient)
  {
  }

  private readonly baseURL = environment["endPoint"];

  AdicionarSistemaFinanceiro(sistemaFinanceiro:SistemaFinanceiro)
  {
      return  this.httpClient.post<SistemaFinanceiro>(`${this.baseURL}/AdicionarSistemaFinanceiro`,
      sistemaFinanceiro)
  }

  ListaSistemasUsuario(emailUsuario:string)
  {
      return this.httpClient.get(`${this.baseURL}/ListaSistemasUsuario?emailUsuario=${emailUsuario}`);
  }

  CadastrarUsuarioNoSistema(idSistema: number, emailUsuario : string)
  {
      return this.httpClient.post<any>(`${this.baseURL}/CadastrarUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`,null)
  }

  ObterSistemaFinanceiro(id: number)
  {
    return this.httpClient.get(`${this.baseURL}/ObterSistemaFinanceiro?id=${id}`);
  }

  AtualizarSistemaFinanceiro(sistemaFinanceiro:SistemaFinanceiro)
  {
      return this.httpClient.put<SistemaFinanceiro>(`${this.baseURL}/AtualizarSistemaFinanceiro`,
      sistemaFinanceiro)
  }
  
  ExecuteCopiaDespesasSistemaFinanceiro()
  {
      return this.httpClient.post<any>(`${this.baseURL}/ExecuteCopiaDespesasSistemaFinanceiro`,null)
  }
}
