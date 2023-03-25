import { Component } from '@angular/core';
import { CommonService } from './service/common.service';



const DOMAIN_LIST ="https://raw.githubusercontent.com/jobyywilson/domain-seller-resource/main/domain-list.json"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'domain-seller';
  primaryDomainName : string = ""
  primaryDomainEstimated : number = 0
  primaryDomainBuyNowUrl : string =""
  domainList : any = []


  constructor(private commonService:CommonService){

  }

  ngOnInit(): void {
    this.commonService.readFile(DOMAIN_LIST).subscribe((rawDomainList:any)=>{
      console.log(rawDomainList)
      for(let index=0;index<rawDomainList.length;index++){
        let domain = rawDomainList[index]
        let domainName = domain['domainName']
        let estmatedValue =  domain['estmatedValue']
        let buyNowUrl =  domain['buyNowUrl']
        let currentDomainName = window.location.hostname
        console.log(currentDomainName)
        if(domainName == currentDomainName){
          this.primaryDomainName = domainName
          this.primaryDomainEstimated = estmatedValue
          this.primaryDomainBuyNowUrl = buyNowUrl
          console.log(domain)
        }else{
          if(domainName == 'localhost'){
            continue;
          }
          this.domainList.push(domain)
        }
      }
    })

  }
}
