//
//  NativeDemoViewController.swift
//  linktest
//
//  Created by Ritesh Shakya on 12/3/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation


class NativeDemoViewController: UIViewController  {

  @IBAction func onGoBack(_ sender: UIButton) {
    self.dismiss(animated: true, completion: nil)
  }
  
  @IBAction func onMoveForward(_ sender: UIButton) {
    let mockData:NSDictionary = ["userId":"B139DF2B-E4A1-4D30-A838-FEA195167092"]
    if let appDelegate: AppDelegate = UIApplication.shared.delegate as? AppDelegate{
      appDelegate.navigateToRN("PROFILE", mockData, nil)
    }
  }
  
  override func viewWillAppear(_ animated: Bool) {
      super.viewWillAppear(true)
      self.navigationController?.setNavigationBarHidden(true, animated: true)
  }
  
  override func viewWillDisappear(_ animated: Bool) {
      super.viewWillDisappear(true)
      self.navigationController?.setNavigationBarHidden(false, animated: true)
  }
}
