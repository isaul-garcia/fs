import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  let component
  const mockHandlerUpdate = jest.fn()
  const mockHandlerDelete = jest.fn()

  beforeEach(() => {
    const user = {
      name: 'Juan del Pueblo',
      username: 'username',
    }

    const blog = {
      title: 'Blog Title',
      author: 'Author',
      url: 'website.com',
      likes: 1,
      user: {
        username: 'username',
      },
    }

    component = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={mockHandlerUpdate}
        deleteBlog={mockHandlerDelete}
      />
    )
  })

  test('renders without errors', () => {
    expect(component).toBeDefined()
  })

  test('shows blog title and author, but not url and likes', () => {
    const titleAndAuthor = component.container.querySelector('.title-author')
    expect(titleAndAuthor).toBeDefined()

    const details = component.container.querySelector('.details')
    expect(details).toBe(null)
  })

  test('shows blog details when "show" button is clicked', () => {
    let button = component.getByText('View')
    fireEvent.click(button)

    button = component.getByText('Hide')
    expect(button).toBeDefined()

    const details = component.container.querySelector('.blog-details')
    expect(details).toBeDefined()
  })

  test('hides blog details when "hide" button is clicked', () => {
    let button = component.getByText('View')
    fireEvent.click(button)

    button = component.getByText('Hide')
    expect(button).toBeDefined()
    fireEvent.click(button)

    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).toBe(null)
  })

  test('calls event handler twice when clicking "like" button twice', () => {
    let viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    let likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
})
