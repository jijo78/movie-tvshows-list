import styled from 'styled-components'

/**
 * Card is a general purpose container for content.
 */
const Search = styled('section')`
    border-bottom: 3px solid $light-grey;
    margin-bottom: 2rem;
    display: flex;
`

/**
 * Contains an image or other media to be placed inside the card
 */
export const SearchForm = styled('form')`
    width: 100%;
    position: relative;
    &fieldset{
      margin: 0;
      padding: 0;
      border: 0 none;
    }
    &.search__form--hidden{
      display: none;
    }
`
export const SearchLegend = styled('legend')`
       display: none;

`

export const SearchInput = styled('input')`
   color: $light-grey;
    background-color: $black;
    width: 100%;
    padding: 0.2rem 0;
    font-size: 2rem;
    border: 0 none;
    &::placeholder {
      color: $light-grey;
    }
`

/**
 * Content to be placed at the bottom of the card.
 */
export const CardFooter = styled(Box)`
  position: relative;
  padding-top: 0;
`

export default Card

.search{
    border-bottom: 3px solid $light-grey;
    margin-bottom: 2rem;
    display: flex;
  }
    
  .search__form{
    width: 100%;
    position: relative;
    fieldset{
      margin: 0;
      padding: 0;
      border: 0 none;
    }
    .search__form--hidden{
      display: none;
    }
  }
  
  .search__input{
 
  }