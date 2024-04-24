package com.shoes.warehoue.controller;

import com.shoes.warehoue.dto.ImportDto;
import com.shoes.warehoue.model.ImportParam;
import com.shoes.warehoue.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imports")
@CrossOrigin("*")
public class ImportController {
    @Autowired
    private ImportService importService;

    @PostMapping
    public void createImport(@RequestBody ImportDto.CreateImport dto) {
        importService.createImportInfo(dto);
    }

    @PutMapping
    public void updateImport(@RequestBody ImportDto dto) {
        importService.updateImportInfo(dto);
    }

    @DeleteMapping
    public void deleteImport(@RequestBody ImportDto.deleteImport dto) {
        importService.deleteImportInfo(dto);
    }

    @GetMapping
    public ImportDto.MultipleImport getAllImport(@ModelAttribute ImportParam param) {
        return importService.getImportList(param);
    }
}
