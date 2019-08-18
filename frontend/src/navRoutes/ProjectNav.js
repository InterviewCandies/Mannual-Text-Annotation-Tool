export default {
    items: [
      {
        name: 'Projects',
        url: '/',
        icon: 'icon-speedometer',
        
      },
      {
        name: 'Dataset',
        url: '/dataset',
        icon: 'icon-speedometer',
        
      },
      {
        name: 'Labels',
        url: `/project/${localStorage.getItem('projectId')}/labels`,
        icon: 'icon-speedometer',
        
      }
    
    ],
  };
  