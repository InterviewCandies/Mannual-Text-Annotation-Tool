export default {
    items: [
     
      {
        name: 'Dataset',
        url: `/project/${localStorage.getItem('projectId')}/dataset`,
        icon: 'icon-speedometer',
        
      },
      {
        name: 'Labels',
        url: `/project/${localStorage.getItem('projectId')}/labels`,
        icon: 'icon-speedometer',
        
      }
    
    ],
  };
  