

# 🚀 Lab 4: Custom Connectors

Time to complete: **~45 minutes**

Now we have created code-first extensions, but how do we add these to source control so that they can be built and deployed as part of a solution without manually having to deploy them and export a solution?

## ✅Task 1 - Clone solution

In Dataverse, you now have a solution that contains the metadata for tables and apps, along side your PCF control, Plugin & Custom connector.

1. Inside **VS Code** at the PowerShell terminal, clone the solution using the following:
   ```powershell
   pac solution clone --name "PowerPlatformProDeveloperWorkshop" --async --packagetype Both --outputDirectory "C:\workshop\solution"
   
   code c:\workshop -r
   ```

   You will see that the solution has been exported and unpacked into the solution folder. Explore all the folders and see the metadata from the tables and apps. Notice that we selected Both for the package type - this means that the files will allow packing the solution as a managed or unmanaged solution, but it does mean that there will be two versions of the Dataverse table forms - one managed and one unmanaged (e.g. `solution\PowerPlatformProDeveloperWorkshop\src\Entities\contoso_listing\FormXml\main\{530bff54-7d3d-ef11-8409-0022480bc9e8}_managed.xml`)

1. The solution contains some artefacts that we do not want to commit to source code control:

   1. If you open the folder `solution\PowerPlatformProDeveloperWorkshop\src\PluginAssemblies\ContosoRealEstateBusinessLogic-...` you'll see that it contains an assembly. We do not want to commit this to source control since it should always be built from the plugin code.
   1. If you open the folder `solution\PowerPlatformProDeveloperWorkshop\src\WebResources\contoso_\portal-admin` you'll see the JavaScript webresource. This should always be built by the source TypeScript rather than stored in source control.
   1. If you open the controls folder `solution\PowerPlatformProDeveloperWorkshop\src\Controls\contoso_Contoso.ImageGrid` you will see the bundle.js which is the transpiled TypeScript for the PCF component. We don't want to add this to source code control since it will always be built from the latest source.

1. Notice there is a project file named `PowerPlatformProDeveloperWorkshop.cdsproj`. This file allows us to build the solution from it's component parts, but we need to add configuration on how to build the source TypeScript for the Web resource and the PCF, and C# for the Plugin.

1. First we add configuration to build the custom control. At the PowerShell terminal in VS Code:

   ```
   cd c:\workshop\solution\PowerPlatformProDeveloperWorkshop
   pac solution add-reference --path "C:\workshop\image-grid-pcf\image-grid-pcf.pcfproj"
   ```

1. Open the solution project file at `C:\workshop\solution\PowerPlatformProDeveloperWorkshop\PowerPlatformProDeveloperWorkshop.cdsproj`
   Notice how there is now a section:

   ```xml
     <ItemGroup>
       <ProjectReference Include="..\..\image-grid-pcf\image-grid-pcf.pcfproj" />
     </ItemGroup>
   ```

   This will result in the pcf control to be built when the solution is built.

1. Because we are build the pcf, we can delete the folder `C:\workshop\solution\PowerPlatformProDeveloperWorkshop\src\Controls`

1. Add a file under `mda-client-hooks` named `mda-client-hooks.csproj`

   ```
   <Project ToolsVersion="Current" DefaultTargets="Build">
   
     <PropertyGroup>
       <Configuration Condition=" '$(Configuration)' == '' ">Debug</Configuration>
     </PropertyGroup>
   
     <!-- Prevent Csc from being called -->
     <Target Name="CoreCompile" />
     <Target Name="GetProjectOutputPath"/>
     <Target Name="CopyFilesToOutputDirectory"/>
     
   
     <Target Name="Build" AfterTargets="GetProjectOutputPath">
       <Exec Command="npm ci" Condition="'$(Configuration)' == 'Debug'"/>
       <Exec Command="npm install" Condition="'$(Configuration)' == 'Release'"/>
       <Exec Command="npm run build:dev " Condition="'$(Configuration)' == 'Debug'"/>
       <Exec Command="npm run build:prod" Condition="'$(Configuration)' == 'Release'"/>
     </Target>
   
   </Project>
   ```

   This project file will allow us to add the TypeScript transpilation that uses webpack as part of the solution build. You can see that the `npm run build` command is run when **Build** is executed.

1. Now we can add a reference to this project back in the `C:\workshop\solution\PowerPlatformProDeveloperWorkshop\PowerPlatformProDeveloperWorkshop.cdsproj` underneath the pcf project reference:
   ```xml
     <ItemGroup>
       <ProjectReference Include="..\..\image-grid-pcf\image-grid-pcf.pcfproj" />
       <ProjectReference Include="..\..\mda-client-hooks\mda-client-hooks.csproj" />
     </ItemGroup>
   ```

1. Now we can delete the JavaScript at `solution\PowerPlatformProDeveloperWorkshop\src\WebResources\contoso_\portal-admin\mda-client-hooks.js`

1. We can also add a reference to the plugin project by adding:

   ```xml
     <ItemGroup>
       <ProjectReference Include="..\..\image-grid-pcf\image-grid-pcf.pcfproj" />
       <ProjectReference Include="..\..\mda-client-hooks\mda-client-hooks.csproj" />
       <ProjectReference Include="..\..\ContosoRealEstateBusinessLogic\ContosoRealEstateBusinessLogic.csproj" />
     </ItemGroup>
   ```

1. Now we can delete the Plugin assembly at `solution\PowerPlatformProDeveloperWorkshop\src\PluginAssemblies\ContosoRealEstateBusinessLogic-...guid...\ContosoRealEstateBusinessLogic.dll`

     > [!NOTE]
     > The GUID will be difference in each deployment.

1. The pcf build will automatically be mapped to the solution, however the web resource and plugin need specific configuration using a solution map file. Create a file named `solution-mapping.xml` under the folder `solution\PowerPlatformProDeveloperWorkshop`.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <Mapping>
        <FileToFile map="ContosoRealEstateBusinessLogic.dll" to="../../../../../ContosoRealEstateBusinessLogic/bin/publish/ContosoRealEstate.BusinessLogic.dll" />
        <FileToFile map="mda-client-hooks.js" to="../../../../../mda-client-hooks/dist/ClientHooks.js" /> 
    </Mapping>
    ```

1. To instruct the solution build process to use this, we must add it to the `C:\workshop\solution\PowerPlatformProDeveloperWorkshop\PowerPlatformProDeveloperWorkshop.cdsproj`  by adding the following underneath the `<SolutionRootPath>src</SolutionRootPath>` element:

    ```
    <OutputPath>bin\</OutputPath>
    <SolutionPackageType>Both</SolutionPackageType>
    <SolutionPackageMapFilePath>$(MSBuildThisFileDirectory)\solution-mapping.xml</SolutionPackageMapFilePath>
    ```

1. To check that the build process works, you can run the following at the VS Code PowerShell terminal:

     ```
     cd "C:\workshop\solution\PowerPlatformProDeveloperWorkshop"
     dotnet build -c Release
     ```

     The projects will be built and the tests run.

1. Open the built solution in file explorer at `solution\PowerPlatformProDeveloperWorkshop\bin\PowerPlatformProDeveloperWorkshop_managed.zip` by right clicking on the file and selected **Reveal in File Explorer**. Open the solution zip and check that the following files are present as a result of the build:

    1. `Controls/contoso_Contoso.ImageGrid/bundle.js`
    1. `PluginAssemblies/ContosoRealEstateBusinessLogic-D3A8E79A-791E-446C-B45D-0684436C6CD6/ContosoRealEstateBusinessLogic.dll`
    1. `WebResources/contoso_portal-adminmda-client-hooksjs49318710-DB64-EF11-BFE2-000D3A5D1D92`

1. Now that you have a fully buildable version of your solution, you can add the folder to source control. First create a file called .gitignore in the `c:\workshop` folder

    ```bat
    # TypeScript
    node_modules/
    dist/
    out/
    *.log
    *.tsbuildinfo
    
    # Visual Studio
    .vscode/
    *.user
    *.suo
    *.userosscache
    *.sln.docstates
    packages/
    
    
    # Build results
    [Dd]ebug/
    [Rr]elease/
    x64/
    x86/
    [Aa][Rr][Mm]/
    [Aa][Rr][Mm]64/
    bld/
    [Bb]in/
    [Oo]bj/
    [Ll]og/
    [Ll]ogs/
    
    # Visual Studio Code
    .vs/
    
    # User-specific files
    *.rsuser
    *.suo
    *.user
    *.userosscache
    *.sln.docstates
    
    # Windows image file caches
    Thumbs.db
    ehthumbs.db
    
    # VS Code directories
    .vscode/
    .history/
    
    # Local History for Visual Studio
    .localhistory/
    
    # Windows shortcuts
    *.lnk
    
    # Test results
    TestResults/
    coverage/
    
    ```

1. Run the following to initialize the repository:

    ```powershell
    cd C:\workshop
    git init
    ```

1. Inside VS Code, navigate to the Source Control activity pane. Enter a commit message of *Initial Commit', and select **Commit**.

1. Inside **make.powerapps.com**, make a change to the solution (e.g. add a new field to a table and form). We can now synchronize our changes by using:

    ```powershell
    pac solution sync --solution-folder "C:\workshop\solution\PowerPlatformProDeveloperWorkshop" --async --packagetype Both
    ```

1. Navigate to the Source Control activity pane again and look at the changes that are synced. You can the commit these changes. One of the things that you will need to get familiar with is excluding 'Noisy Diffs' from your commits. That is, the changes that were not caused by you - but by the platform.



## 🥳Congratulations!

You've now got your code-first solution under source control ready for pushing to GitHub.
