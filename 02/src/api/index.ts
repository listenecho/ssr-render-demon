import axios from 'axios'

const MINE = 'https://api.uomg.com/api/qq.info?qq=774740085'
const HOME = 'https://api.uomg.com/api/rand.avatar?format=json'
const NEWS = 'https://api.uomg.com/api/comments.163?format=json'


export function fetchMINEData() {
    return axios.get(MINE)
}
export function fetchHOMEData() {
    return axios.get(HOME)
}
export function fetchNEWSData() {
    return axios.get(NEWS)
}