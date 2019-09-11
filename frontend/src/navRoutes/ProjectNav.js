export default {
    items: [
     
      {
        name: 'Dataset',
        url: `/project/${localStorage.getItem('projectId')}/dataset`,
        icon: 'icon-layers',
        
      },
      {
        name: 'Labels',
        url: `/project/${localStorage.getItem('projectId')}/labels`,
        icon: 'icon-speedometer',
        
      },
      {
        name: 'Statistics',
        url: `/project/${localStorage.getItem('projectId')}/labels`,
        icon: 'icon-speedometer',
        
      }
    
    ],
  };
  