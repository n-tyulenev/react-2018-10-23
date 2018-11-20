import {
  INCREMENT,
  DELETE_ARTICLE,
  CHANGE_DATE_RANGE,
  CHANGE_SELECTION,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  LOAD_ARTICLE_COMMENTS,
  LOAD_PAGED_COMMENTS,
  START,
  SUCCESS,
  FAIL
} from '../constants'

export function incrementActionCreator() {
  return { type: INCREMENT }
}

export function deleteArticle(articleId) {
  return {
    type: DELETE_ARTICLE,
    payload: { id: articleId }
  }
}

export function changeDateRange(dateRange) {
  return {
    type: CHANGE_DATE_RANGE,
    payload: { dateRange }
  }
}

export function changeSelection(selected) {
  return {
    type: CHANGE_SELECTION,
    payload: { selected }
  }
}

export function addComment(comment, articleId) {
  return {
    type: ADD_COMMENT,
    payload: { comment, articleId },
    generateId: true
  }
}

export function loadAllArticles() {
  return {
    type: LOAD_ALL_ARTICLES,
    callAPI: '/api/article'
  }
}

export function loadArticleComments(articleId) {
  return {
    type: LOAD_ARTICLE_COMMENTS,
    payload: { articleId },
    callAPI: `/api/comment?article=${articleId}`
  }
}

export function loadCommentsInPage(pageNumber) {
  return function(dispatch) {
    dispatch({
      type: LOAD_PAGED_COMMENTS + START,
      payload: { page: pageNumber }
    })
    const pageInteger = parseInt(pageNumber)
    const pageSize = 5
    const offset = (pageInteger - 1) * pageSize
    fetch(`/api/comment?limit=${pageSize}&offset=${offset}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch({
          payload: { ...response, page: pageNumber },
          type: LOAD_PAGED_COMMENTS + SUCCESS
        })
      })
      .catch((e) =>
        dispatch({
          type: LOAD_PAGED_COMMENTS + FAIL,
          payload: { page: pageNumber },
          error: e
        })
      )
  }
}

export function loadArticle(id) {
  return function(dispatch) {
    dispatch({
      type: LOAD_ARTICLE + START,
      payload: { id }
    })

    fetch(`/api/article/${id}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch({
          payload: response,
          type: LOAD_ARTICLE + SUCCESS
        })
      })
      .catch((e) =>
        dispatch({
          type: LOAD_ARTICLE + FAIL,
          payload: { id },
          error: e
        })
      )
  }
}
