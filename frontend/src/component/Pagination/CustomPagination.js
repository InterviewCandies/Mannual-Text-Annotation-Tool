import React,{Component} from 'react'
import {
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'
class CustomPagination extends Component{
        constructor(props){
             super(props)
            
             this.state={
                 currentPage : this.props.currentPage,
                 pages : this.props.pages
             }
        }
        componentDidUpdate(oldProps){
             const props = this.props
             if(oldProps.pages != props.pages) 
                 this.setState({
                       pages: props.pages
                 })
        }
        onClick=async(e)=>{
             let page=0;
            if(e.target.value =='-1')  page = this.state.currentPage-1;
            else if(e.target.value =='+1')  page = this.state.currentPage+1;
            else page = Number(e.target.value)
             await this.setState({
                 currentPage : page
             })
            this.props.onClick(page)
        }
        
        
        render(){
           const {pages,currentPage} = this.state
           let s=(currentPage>5)?currentPage-4:1
           let page = []
           for(let i=s;i<=currentPage+4  && i<=pages;i++)
              page.push(  
                (i==currentPage)?  
                  <PaginationItem>
                        <PaginationLink active>{i}</PaginationLink>
                  </PaginationItem> : 
                (i==currentPage+4 && i<pages)?
                  <PaginationItem>
                            <PaginationLink disabled>...</PaginationLink>
                  </PaginationItem> :
                  <PaginationItem>
                    <PaginationLink onClick={this.onClick} value={i}>{i}</PaginationLink>
                  </PaginationItem>
                )


            return(
              (pages) ?
                <Pagination> 
                    {(currentPage!=1)?
                      <PaginationItem>
                            <PaginationLink value="-1" onClick={this.onClick}>Prev</PaginationLink>
                      </PaginationItem> :
                      <PaginationItem>
                            <PaginationLink disabled>Prev</PaginationLink>
                      </PaginationItem>}
                    {
                      (s!==1)?
                      <PaginationItem>
                            <PaginationLink disabled>...</PaginationLink>
                      </PaginationItem> : <div></div>
                    }
                    {page}
                    {(currentPage!=pages)?
                      <PaginationItem>
                            <PaginationLink value="+1"  onClick={this.onClick}>Next</PaginationLink>
                      </PaginationItem> :
                      <PaginationItem>
                            <PaginationLink disabled>Next</PaginationLink>
                      </PaginationItem>}
                </Pagination> : 
              <div></div>
            )
        }
}
export default CustomPagination