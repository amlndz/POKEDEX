import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../../../../src/App'
import '@testing-library/jest-dom'
import { expect } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

test('Si se da un error la API se muestra errorMSG', async () => {
  const mock = new MockAdapter(axios)
  mock.onGet('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').reply(500)

  render(<App />)

  await waitFor(() => {
    expect(
      screen.getByText('An error ocurred getting Pokémons.'),
    ).toBeInTheDocument()
  })
})

test('Si se da pide a la API una url inexistente se muestra errorMSG', async () => {
  const mock = new MockAdapter(axios)
  mock.onGet('https://pokeapi.co/api/v2/nonexist').reply(400)
  render(<App />)

  await waitFor(() => {
    expect(
      screen.getByText('An error ocurred getting Pokémons.'),
    ).toBeInTheDocument()
  })
})
