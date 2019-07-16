<!DOCTYPE html>
<html lang="pt-BR">

@include('fix.template.head')

    <body id="page-top">
        @include('fix.template.nav')
        @include('fix.template.header')

        @include('sections.sobre')
        @include('sections.projetos')
        @include('sections.signup')
        @include('sections.contato')

        @include('fix.template.footer')
        @include('fix.template.scripts')
    </body>
</html>
