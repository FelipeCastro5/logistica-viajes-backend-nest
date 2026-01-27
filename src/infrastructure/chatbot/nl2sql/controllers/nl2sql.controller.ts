import { Body, Controller, Post, UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/presentation/http/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Nl2sqlService } from '../nl2sql.service';
import { Nl2sqlRequestDto } from './dto/nl2sql-request.dto';

@ApiTags('NL2SQL')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('nl2sql')
export class Nl2sqlController {
    constructor(
        private readonly nl2sql: Nl2sqlService,
        private readonly config: ConfigService,
    ) { }

    // ─────────────────────────────────────────────
    // POST /nl2sql
    // ─────────────────────────────────────────────
    @Post()
    @ApiOperation({
        summary: 'Generar SQL a partir de lenguaje natural (NL2SQL)',
        description:
            'Genera SQL seguro a partir de una pregunta en lenguaje natural. No ejecuta la consulta.',
    })
    @ApiResponse({ status: 201, description: 'SQL generado correctamente' })
    @ApiResponse({ status: 400, description: 'Input inválido o SQL inseguro' })
    async generateSql(@Body() dto: Nl2sqlRequestDto) {
        const isProd =
            this.config.get<string>('NODE_ENV') === 'production';

        return this.nl2sql.execute({
            projectId: dto.projectId,
            question: dto.question,
            context: dto.context,
            debug: !isProd && Boolean(dto.debug),
        });
    }
}
