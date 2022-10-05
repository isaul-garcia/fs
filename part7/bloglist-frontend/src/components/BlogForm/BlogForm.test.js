import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('Form component', () => {
  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const addNewBlog = jest.fn()

    const component = render(<BlogForm addNewBlog={addNewBlog} />)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#create-blog-form')

    fireEvent.change(title, {
      target: { value: 'Blog Title' },
    })
    fireEvent.change(author, {
      target: { value: 'Blog Author' },
    })
    fireEvent.change(url, {
      target: { value: 'Blog Url' },
    })
    fireEvent.submit(form)

    expect(addNewBlog.mock.calls).toHaveLength(1)

    expect(addNewBlog.mock.calls[0][0].title).toBe('Blog Title')
    expect(addNewBlog.mock.calls[0][0].author).toBe('Blog Author')
    expect(addNewBlog.mock.calls[0][0].url).toBe('Blog Url')
  })
})
